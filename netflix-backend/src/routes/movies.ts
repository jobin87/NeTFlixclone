import express, { Request, Response } from 'express';
import Movie from '../models/movies'; // Adjust the path based on your project structure
const router = express.Router();

/**
 * @swagger
 * /api/netflix/v1/movies:
 *   post:
 *     summary: Add a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sellerName:
 *                 type: string
 *                 example: "ABC Corp"
 *               sellerEmail:
 *                 type: string
 *                 format: email
 *                 example: "contact@abccorp.com"
 *               sellerRegNum:
 *                 type: string
 *                 example: "REG123456"
 *               sellerType:
 *                 type: string
 *                 example: "COMPANY"
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *               state:
 *                 type: string
 *                 example: "Kerala"
 *               zipcode:
 *                 type: string
 *                 example: "689699"
 *               country:
 *                 type: string
 *                 example: "INDIA"
 *               countryCode:
 *                 type: string
 *                 example: "+91"
 *               phone:
 *                 type: string
 *                 example: "12345678"
 *               contactPerson:
 *                 type: string
 *                 example: "John Doe"
 *             required:
 *               - sellerName
 *               - sellerEmail
 *               - sellerRegNum
 *               - sellerType
 *     responses:
 *       '200':
 *         description: Seller registration requested successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movies:
 *                   type: boolean
 *                   example: true
 *       '400':
 *         description: Invalid input
 */
router.post('/netflix/v1/movies', async (req: Request, res: Response) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(200).json({ sellerRegistrationRequested: true });
  } catch (err) {
    res.status(400).json({ message: 'Error saving movie', error: err.message });
  }
});

/**
 * @swagger
 * /api/netflix/v1/movies:
 *   get:
 *     summary: Get all movies
 *     responses:
 *       '200':
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sellerRegistrationRequested:
 *                     type: boolean
 *                     example: true
 *       '500':
 *         description: Internal server error
 */
router.get('/netflix/v1/movies', async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    const response = movies.map(() => ({ sellerRegistrationRequested: true }));
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving movies', error: err.message });
  }
});

export default router;
