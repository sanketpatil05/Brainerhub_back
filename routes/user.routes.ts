import express, { Router } from "express";
import { Request, Response } from "express";
import { signup, login } from "../controller/user.controller";

const userRoute: Router = express.Router();

userRoute.post("/signup", (req: Request, res: Response) => {
  signup(req, res);
});

userRoute.post("/login", (req: Request, res: Response) => {
  login(req, res);
});

export { userRoute };
