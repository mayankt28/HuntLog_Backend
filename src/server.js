require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: true, 
  credentials: true 
}));

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/jobs', require('./routes/jobs'));

// Connect DB and start server
connectDB();
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

