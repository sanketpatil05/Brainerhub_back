import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User, { IUser } from '../model/user.model';
import { Request, Response } from 'express';

mongoose.set('strictQuery', false);

const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  bcrypt.hash(password, 5, async function (err: any, hash: string) {
    if (err) {
      res.send('something went wrong, please try again later');
    } else {
      const data = {
        email,
        password: hash,
      };

      const user = await User.insertMany([data]);
      console.log(user);
      res.send(user);
    }
  });
};

const login = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const { email, password } = data;
  
    const result1 = await User.findOne({ email }) as IUser;
  
    const hashed_pass = result1.password;
  
    bcrypt.compare(password, hashed_pass, function (err:any , result: boolean) {
      if (result) {
        const token = jwt.sign({ userId: result1._id }, 'sanket',{ expiresIn: '1m' });
        res.send({ msg: 'login success', token: token, user:result1 });
      } else {
        res.send('Login Failed');
      }
    });
  };

export { signup, login };
