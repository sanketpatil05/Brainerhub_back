"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const userRoute = express_1.default.Router();
exports.userRoute = userRoute;
userRoute.post("/signup", (req, res) => {
    (0, user_controller_1.signup)(req, res);
});
userRoute.post("/login", (req, res) => {
    (0, user_controller_1.login)(req, res);
});
