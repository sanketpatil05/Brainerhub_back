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
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../model/user.model"));
mongoose_1.default.set('strictQuery', false);
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    bcrypt_1.default.hash(password, 5, function (err, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                res.send('something went wrong, please try again later');
            }
            else {
                const data = {
                    email,
                    password: hash,
                };
                const user = yield user_model_1.default.insertMany([data]);
                console.log(user);
                res.send(user);
            }
        });
    });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { email, password } = data;
    const result1 = yield user_model_1.default.findOne({ email });
    const hashed_pass = result1.password;
    bcrypt_1.default.compare(password, hashed_pass, function (err, result) {
        if (result) {
            const token = jsonwebtoken_1.default.sign({ userId: result1._id }, 'sanket', { expiresIn: '1m' });
            res.send({ msg: 'login success', token: token, user: result1 });
        }
        else {
            res.send('Login Failed');
        }
    });
});
exports.login = login;
