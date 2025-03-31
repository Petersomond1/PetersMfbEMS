import express from "express";
import cors from "cors";
import { loginUser, forgotPassword, resetPassword, logoutUser } from "../controllers/auth.controllers.js";
import { getSummaryCount, addAdmin, getAdminDetails } from "../controllers/auth.controllers.js";

const router = express.Router();

const corsOptions = {
    origin: [
      'https://www.microfinancebank.petersomond.com',
      'http://localhost:5173',
      'https://petersemployeemgmtsystem-s3.s3.amazonaws.com',
      // 'https://ec2-3-82-189-9.compute-1.amazonaws.com:3000',
      // 'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Allow cookies and credentials
};

// Apply CORS
router.use(cors(corsOptions));
router.options('/login', cors(corsOptions));

//router.post('/login', adminLogin);
console.log("CORS options applied to /login route");
// Authentication Routes
router.post("/login", loginUser);

router.post("/forgot_password", forgotPassword);
router.post("/reset_password", resetPassword);
router.get("/logout", logoutUser);

router.get("/summaryCount", getSummaryCount);
router.get("/adminDetails", getAdminDetails);

router.post("/add_admin", addAdmin);


export default router;