import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
}

const userschema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  
},{
    timestamps:true
});

const User = mongoose.model<IUser>('User', userschema);

export default User;