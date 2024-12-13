import express from 'express';
import { login, signup } from '../controllers/authControllers';

const authRoutes = express.Router();

/**
 * @swagger
 * /api/v1/auth/userdetails:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: jobin
 *               email:
 *                 type: string
 *                 example: aut.jobin@gmail.com
 *               password:
 *                 type: string
 *                 example: password

 *     responses:
 *       200:
 *         description: Signup successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userLogged:
 *                   type: boolean     
 *                 userId:
 *                   type: string
 *                   example: 12345erw1
 *                 token:
 *                   type: string
 *                   example: 'token'
 *                 Movie:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: Inception
 *                       genre:
 *                         type: string
 *                         example: Sci-Fi
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc2ODg0MzMzM15BMl5BanBnXkFtZTgwODYxODA5NTE@._V1_SY1000_SX1500_AL_.jpg"
 *       400:
 *         description: Bad request, e.g. user already exists
 *       500:
 *         description: Internal server error
 */
authRoutes.post('/login', login);

authRoutes.post('/signup', signup)


export default authRoutes;
