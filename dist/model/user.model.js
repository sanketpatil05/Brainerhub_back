"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userschema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});
const User = mongoose_1.default.model('User', userschema);
exports.default = User;
