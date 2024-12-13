import express from "express"
import { getmoviedata } from "../controllers/movieController"
/**
 * @swagger
 * /api/v1/movies:
 *   get:
 *     summary: Retrieve a list of movies or series based on the query parameter 'type'
 *     tags: [Content]
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [movie, series]
 *         description: The type of content to fetch (either 'movie' or 'series')
 *     responses:
 *       200:
 *         description: A list of movies or series
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The content ID
 *                   movieLodded:
 *                     type: boolean
 *                   title:
 *                     type: string
 *                     description: The content title
 */

const movieroutes = express.Router()

movieroutes.get("/movies/:imdbID", getmoviedata)

export default movieroutes