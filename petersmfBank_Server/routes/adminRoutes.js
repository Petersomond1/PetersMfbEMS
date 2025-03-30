import express from 'express';
import pool from '../utils/db.js'; // Assuming you have a db.js file that exports your database connection pool
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
// import { adminLogin } from '../controllers/auth.controllers.js';


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



router.post('/add_employee', upload.single('employee_Image'), async (req, res) => {
    const sql = 'INSERT INTO employeelist (name, email, password, position, department, salary, address, employee_Image, employment_status, employment_date, department_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    try {
        const hash = await bcrypt.hash(req.body.password.toString(), 10);

        const file = req.file;
        const fileKey = `${uuidv4()}_${file.originalname}`;

        // Upload file to S3
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const uploadResult = await s3.upload(params).promise();

        const employee = [
            req.body.name,
            req.body.email,
            hash,
            req.body.position,
            req.body.department,
            req.body.salary,
            req.body.address,
            uploadResult.Location, // S3 file URL
            req.body.employment_status,
            req.body.employment_date,
            req.body.department_id,
        ];

        const connection = await pool.getConnection();
        try {
            await connection.query(sql, employee);
            res.json({ Status: true });
        } finally {
            connection.release(); // Release the connection back to the pool
        }
    } catch (err) {
        res.json({ Status: false, Error: err.message });
    }
});

router.get('/download_employee_image/:key', (req, res) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: req.params.key,
    };

    s3.getObject(params, (err, data) => {
        if (err) return res.json({ Status: false, Error: "S3 download error" });

        res.setHeader('Content-Type', data.ContentType);
        res.send(data.Body);
    });
});

export default router;
