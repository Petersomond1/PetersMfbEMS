import express from 'express';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';
import pool from './utils/db.js';
import employeeRoutes from './routes/employeeRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Fixed import
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import './utils/db.js';

dotenv.config();

// Define routes and middleware
const corsOptions = {
    origin: [
        'https://www.microfinancebank.petersomond.com',
        'http://localhost:5173',
        'https://petersemployeemgmtsystem-s3.s3.amazonaws.com',
        //'https://ec2-3-82-189-9.compute-1.amazonaws.com:3000',
       'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Authentication Middleware
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({ status: false, message: "Forbidden" });
        }
        req.payload = payload;
        next();
    });
};

// Routes
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes); // Fixed import
app.use('/employee', employeeRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Token Verification Route
app.get('/verify', verifyUser, (req, res) => {
    return res.json({ status: true, role: req.payload.role, id: req.payload.id });
});

// Database connection test
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        res.json({ success: true, result: rows[0].result });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
});