import { Request, Response } from "express";
import fs from "fs";
import path from "path";

// Define the interface for the movie data
interface Series {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string; // Use "Type" instead of "type"
  Response: string;
  Images: string[];
}

export const getAllSeries = (req: Request, res: Response) => {
    const filepath = path.join(__dirname, "../../contentjson/series.json");

    fs.readFile(filepath, 'utf-8', (err, data) => {
      if (err) {
        res.status(400).json({ message: 'Error finding movie', error: err });
        return;
      }
      try {
        // Parse the JSON data and assert the type as an array of Movie objects
        const seriesData: Series[] = JSON.parse(data);
  
        // Filter out movies only from the moviedata
        const series = seriesData.filter(item => item.Type === "series");
        const trendingseries = seriesData.filter(item => item.Type === "trendinganime");
        console.log(trendingseries)


  
        res.json({
            
              series,
              trendingseries, // use camelCase here to match frontend expectations
          });
  
      } catch (err) {
        res.status(400).json({ message: "Parse error", error: err });
      }
    });
  };