"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ai_route_1 = require("./ai.route");
const user_route_1 = require("./user.route");
const product_route_1 = require("./product.route");
const message_router_1 = require("./message.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/products',
        route: product_route_1.ProductRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/messages',
        route: message_router_1.MessageRoutes,
    },
    {
        path: '/ai',
        route: ai_route_1.AiRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
