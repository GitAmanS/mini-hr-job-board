const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

connectDB();


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs',  require('./routes/jobRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));