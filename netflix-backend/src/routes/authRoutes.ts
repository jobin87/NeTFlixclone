import express from 'express';
import { adminLogin } from '../controllers/authControllers';

const authRoutes = express.Router();

// Admin login route
authRoutes.post('/api/admin-user/v1', adminLogin);

export default authRoutes;
