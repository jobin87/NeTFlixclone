import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
import connectDB from './config/db';
import movieroutes from './routes/contentRouter';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: ['https://netflixclone-2frontend.onrender.com' , 'http://localhost:8001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dashboard', movieroutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
