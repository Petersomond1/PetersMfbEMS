import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import dotenv from "dotenv";
import pool from "../utils/db.js";

dotenv.config();

// LOGIN CONTROLLER
export const loginUser = async (req, res) => {
    const { email, password, role } = req.body;

    let sql;
    if (role === "admin") {
        sql = "SELECT * FROM admin WHERE email = ?";
    } else if (role === "employee") {
        sql = "SELECT * FROM employeelist WHERE email = ?";
    } else {
        return res.status(400).json({ loginStatus: false, Error: "Invalid role" });
    }

    try {
        const [rows] = await pool.query(sql, [email]);
        if (rows.length === 0) {
            return res.status(404).json({ loginStatus: false, Error: "Email does not exist" });
        }

        const user = rows[0];

        // First-time login - password needs to be hashed
        if (!user.hashedPassword) {
            if (password === user.password) {
                const hashedPassword = bcrypt.hashSync(password, 10);
                const updateSql = role === "admin"
                    ? "UPDATE admin SET password = ?, hashedPassword = ? WHERE email = ?"
                    : "UPDATE employeelist SET password = ?, hashedPassword = ? WHERE email = ?";
                await pool.query(updateSql, [hashedPassword, hashedPassword, email]);

                const token = jwt.sign(
                    { role, email, id: user.id },
                    role === "admin" ? process.env.JWT_ADMIN_SECRET : process.env.JWT_EMPLOYEE_SECRET,
                    { expiresIn: "1d" }
                );

                res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "None" });

                return res.json({ loginStatus: true, email, id: user.id, role, firstTime: true });
            } else {
                return res.status(401).json({ loginStatus: false, Error: "Wrong email or password" });
            }
        } else {
            // Regular login
            const match = await bcrypt.compare(password, user.hashedPassword);
            if (match) {

                const secretKey = role === "admin" ? process.env.JWT_ADMIN_SECRET : process.env.JWT_EMPLOYEE_SECRET;
                if (!secretKey) {
                    console.error("JWT secret key is missing for role:", role);
                    return res.status(500).json({ loginStatus: false, Error: "Internal server error" });
                }

               const token = jwt.sign(
                { role, email, id: user.id },
                secretKey,
                { expiresIn: "1d" }
            );

                res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "None" });

                return res.json({ loginStatus: true, email, id: user.id, role });
            } else {
                return res.status(401).json({ loginStatus: false, Error: "Wrong email or password" });
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ loginStatus: false, Error: "Query error" });
    }
};

// FORGOT PASSWORD CONTROLLER
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const code = crypto.randomBytes(3).toString("hex"); // Generate a 6-character alphanumeric code

    const sql = "UPDATE employeelist SET password = ? WHERE email = ?";
    try {
        const [result] = await pool.query(sql, [code, email]);
        if (result.affectedRows > 0) {
            // Send code via email or SMS (implementation not shown here)
            return res.json({ success: true });
        } else {
            return res.status(404).json({ success: false, message: "Email not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Query error" });
    }
};

// RESET PASSWORD CONTROLLER
export const resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;

    const sql = "SELECT * FROM employeelist WHERE email = ? AND password = ?";
    try {
        const [rows] = await pool.query(sql, [email, code]);
        if (rows.length > 0) {
            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            const updateSql = "UPDATE employeelist SET password = ?, hashedPassword = ? WHERE email = ?";
            await pool.query(updateSql, [hashedPassword, hashedPassword, email]);
            return res.json({ success: true });
        } else {
            return res.status(400).json({ success: false, message: "Invalid code" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Query error" });
    }
};

// LOGOUT CONTROLLER
export const logoutUser = (req, res) => {
    res.clearCookie("token");
    return res.json({ Status: true });
};
