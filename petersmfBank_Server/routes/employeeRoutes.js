import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import dotenv from "dotenv";
import AWS from "aws-sdk";
import multer from "multer";
import pool from "../utils/db.js"; 
import cors from "cors";
//import { v4 as uuidv4 } from "uuid";



dotenv.config();

const router = express.Router();


const corsOptions = {
  origin: [
    'https://www.microfinancebank.petersomond.com',
    'http://localhost:5173',
    'https://petersemployeemgmtsystem-s3.s3.amazonaws.com',
    'https://ec2-3-82-189-9.compute-1.amazonaws.com:3000',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Allow cookies and credentials
};

// Apply CORS
router.use(cors(corsOptions));

// Handle preflight requests
router.options('/login', cors(corsOptions));


// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



router.get("/employee_profile/:id", async (req, res) => {
  const sql = "SELECT * FROM employeelist WHERE id = ?";
  try {
    const [rows] = await pool.query(sql, [req.params.id]);
    return res.json({ Status: true, employee: rows });
  } catch (err) {
    return res.json({ Status: false, Error: "Query error" });
  }
});



export default router;
