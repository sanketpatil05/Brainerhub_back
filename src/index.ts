const express =require("express")
import { connect } from "../config/db";
import Product, { IProduct } from '../model/product.model';

import { userRoute } from "../routes/user.routes";
import { Request, Response } from "express";

const app = express();

app.use(express.json());
// app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to home page");
});

app.use("/user", userRoute);

app.get("/products",async(req:Request, res:Response)=>{
     try{
        const products= await Product.find();

        res.send(products)
     }
     catch(err:any){
        console.log(err)
     }
    
});

 app.post("/products",async(req:Request, res:Response)=>{
    try{
        const {name, price, description, quantity, image}=req.body; 
        const data=new Product({
            name, 
            price, 
            description,
            quantity, 
            image
        });

         console.log(data)
          
        await data.save()

         res.send(data);
    }
    catch(err:any){
       console.log(err)
    }
   
});

app.listen(5000, () => {
  try {
     connect();
    console.log("connection done");
  } catch (err) {
    console.log(err);
  }
  console.log("server started on 5000");
});
