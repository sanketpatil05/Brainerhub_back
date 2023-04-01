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
const express = require("express");
const db_1 = require("../config/db");
const product_model_1 = __importDefault(require("../model/product.model"));
const user_routes_1 = require("../routes/user.routes");
const app = express();
app.use(express.json());
// app.use(cors());
app.get("/", (req, res) => {
    res.send("welcome to home page");
});
app.use("/user", user_routes_1.userRoute);
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find();
        res.send(products);
    }
    catch (err) {
        console.log(err);
    }
}));
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, description, quantity, image } = req.body;
        const data = new product_model_1.default({
            name,
            price,
            description,
            quantity,
            image
        });
        console.log(data);
        yield data.save();
        res.send(data);
    }
    catch (err) {
        console.log(err);
    }
}));
app.listen(5000, () => {
    try {
        (0, db_1.connect)();
        console.log("connection done");
    }
    catch (err) {
        console.log(err);
    }
    console.log("server started on 5000");
});
