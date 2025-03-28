import express from 'express';
import './utils/db.js';  

const app = express();
const PORT = 3000;

// Define routes
app.get('/', (req, res) => {
  // res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});