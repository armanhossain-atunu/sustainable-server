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
exports.default = handler;
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
let cachedDb = null;
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (cachedDb) {
            return cachedDb;
        }
        if (!config_1.default.database_url) {
            throw new Error('Database URL is not provided in environment variables');
        }
        // Set strictQuery to false to prepare for Mongoose 7
        mongoose_1.default.set('strictQuery', false);
        const db = yield mongoose_1.default.connect(config_1.default.database_url);
        cachedDb = db;
        console.log('Connected to MongoDB successfully');
        return db;
    });
}
// For local development
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    connectToDatabase().then(() => {
        app_1.default.listen(config_1.default.port, () => {
            console.log(`Server is listening on port ${config_1.default.port}`);
        });
    }).catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
}
// For Vercel Serverless Function
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectToDatabase();
        }
        catch (error) {
            console.error('Database connection error in Vercel handler:', error);
            return res.status(500).json({ error: 'Database connection failed' });
        }
        return (0, app_1.default)(req, res);
    });
}
