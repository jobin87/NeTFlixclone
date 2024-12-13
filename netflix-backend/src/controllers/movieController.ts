import { error } from "console";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const getmoviedata = (req:Request, res:Response)=>{
    const filepath = path.join(__dirname,"../../moviesjson/movies.json")

    fs.readFile(filepath,'utf-8',(err,data)=>{
        if(err){
            res.status(400).json({message:'error finding movie', error:err})
            return
        }
        try{
            const moviedata= JSON.parse(data)
            res.json(moviedata)
        }
        catch(err){
            res.status(400).json({message:"parse error", error:err})
        }

    })
}
