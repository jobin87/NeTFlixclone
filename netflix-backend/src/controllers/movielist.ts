import { Request, Response } from 'express';

export const movielist = async (req: Request, res: Response) => {
    try {
        const newMovie = new movielist(req.body);
        await newMovie.save();
        res.status(200).json({ sellerRegistrationRequested: true });
      } catch (err) {
        res.status(400).json({ message: 'Error saving movie', error: err.message });
      }
    });
