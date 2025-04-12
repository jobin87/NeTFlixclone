"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const contentRouter_1 = __importDefault(require("./routes/contentRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
const corsOptions = {
    origin: ['https://netflixclone-2frontend.onrender.com', 'http://localhost:8001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/dashboard', contentRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
