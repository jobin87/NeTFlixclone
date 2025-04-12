"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAnimes = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getAllAnimes = (req, res) => {
    const filepath = path_1.default.join(__dirname, "../../contentjson/anime.json");
    fs_1.default.readFile(filepath, 'utf-8', (err, data) => {
        if (err) {
            res.status(400).json({ message: 'Error finding movie', error: err });
            return;
        }
        try {
            // Parse the JSON data and assert the type as an array of Movie objects
            const animeData = JSON.parse(data);
            // Filter out movies only from the moviedata
            const anime = animeData.filter(item => item.Type === "anime");
            const trendinganime = animeData.filter(item => item.Type === "trendinganime");
            console.log(trendinganime);
            res.json({
                anime,
                trendinganime, // use camelCase here to match frontend expectations
            });
        }
        catch (err) {
            res.status(400).json({ message: "Parse error", error: err });
        }
    });
};
exports.getAllAnimes = getAllAnimes;
