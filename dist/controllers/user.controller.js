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
exports.userControllers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../models/user.model");
// Register user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // Check if user already exists
        const isUserExist = yield user_model_1.User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: 'User already exists!',
            });
        }
        const savedUser = yield user_model_1.User.create(req.body);
        // Generate token
        const token = jsonwebtoken_1.default.sign({ email: savedUser.email, role: savedUser.role }, config_1.default.jwt_secret, { expiresIn: config_1.default.jwt_expires_in });
        // Omit password from response
        const userResponse = savedUser.toObject();
        delete userResponse.password;
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: userResponse,
            token,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to register user',
            error: err.message,
        });
    }
});
// Login user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = yield user_model_1.User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }
        // Compare passwords
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ email: user.email, role: user.role }, config_1.default.jwt_secret, { expiresIn: config_1.default.jwt_expires_in });
        // Omit password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token,
            data: userResponse,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to login',
            error: err.message,
        });
    }
});
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find().select('-password');
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: users,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: err.message,
        });
    }
});
exports.userControllers = {
    register,
    login,
    getUsers,
};
