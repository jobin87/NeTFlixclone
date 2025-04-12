"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMovies = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
// TMDB config
const TMDB_BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Yzk4Mzk5M2MzY2JjYWIyMjQ2YTY0ODFiMzFjMWNlOCIsIm5iZiI6MTc0NDIyMjMzMS42NDEsInN1YiI6IjY3ZjZiODdiZGU1ZTRkZWM2MmFjZmRjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xOtscrrk8GIvO8a7ZBlEStmLLdQJBqUZLXJPdN5y4Wc';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filepath = path_1.default.join(__dirname, "../../contentjson/movie.json");
    try {
        // Load local movie JSON file
        const fileData = fs_1.default.readFileSync(filepath, "utf-8");
        const moviedata = JSON.parse(fileData);
        // Filter movies by type
        const movies = moviedata.filter(item => item.Type === "movie");
        const trendingmovies = moviedata.filter(item => item.Type === "trending-movie");
        // Fetch TMDB data
        const [upcomingRes, nowPlayingRes, topRatedRes] = yield Promise.all([
            axios_1.default.get(`${TMDB_BASE_URL}/movie/upcoming`, {
                params: {
                    language: "en-US",
                    region: "US",
                },
                headers: {
                    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
                    accept: "application/json",
                },
            }),
            axios_1.default.get(`${TMDB_BASE_URL}/movie/now_playing`, {
                params: {
                    language: "en-US",
                    region: "US",
                },
                headers: {
                    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
                    accept: "application/json",
                },
            }),
            axios_1.default.get(`${TMDB_BASE_URL}/movie/top_rated`, {
                params: {
                    language: "en-US",
                    region: "US",
                },
                headers: {
                    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
                    accept: "application/json",
                },
            }),
        ]);
        // Extract movie arrays from TMDB responses
        const upcomingMovies = upcomingRes.data.results;
        const nowPlaying = nowPlayingRes.data.results;
        const topRated = topRatedRes.data.results;
        // Send response
        res.json({
            movies,
            trendingmovies,
            upcomingMovies,
            nowPlaying,
            topRated,
        });
    }
    catch (err) {
        console.error("Error in getAllMovies:", err);
        res.status(400).json({
            message: "Error processing movie data",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.getAllMovies = getAllMovies;
