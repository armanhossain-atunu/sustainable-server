"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
// Register user
router.post('/register', user_controller_1.userControllers.register);
// Login user
router.post('/login', user_controller_1.userControllers.login);
// Get all users
router.get('/', user_controller_1.userControllers.getUsers);
exports.UserRoutes = router;
