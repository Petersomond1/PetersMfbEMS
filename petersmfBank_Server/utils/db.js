import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
pool.getConnection()
  .then(connection => {
    console.log("Database connection established successfully");
    connection.release(); // Release the connection back to the pool
  })
  .catch(err => {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1); // Exit the process if the database connection fails
  });

export default pool;