import { Router, Request, Response } from "express";
const authRouter = Router();
const CryptoJS = require('crypto-js');
import * as jwt from 'jsonwebtoken';
import User from "../models/user";
//register
authRouter.post('/register', async (request:Request, response:Response)=>{
    const newUser = new User({
        vorname:request.body.vorname,
        nachname:request.body.nachname,
        email:request.body.email,
        username:request.body.username,
        street:request.body.street,
        number:request.body.number,
        plz:request.body.plz,
        city:request.body.city,
        password: CryptoJS.AES.encrypt(
            request.body.password,
            process.env.PASS_SEC
        ).toString(),
    });
    try{
        const savedUser = await newUser.save();
        response.status(200).json(savedUser);
    } catch(error){
        response.status(403)
        throw new Error('Action failed');
    }
});

//login
authRouter.post('/login', async (request:Request, response:Response)=>{
    let sec:string = process.env.JWT_SEC as string;
    try{
        const user = await User.findOne({username:request.body.username});
        !user && response.status(401).json("Falsche Eingabe");
        const hashedPassword = CryptoJS.AES.decrypt(user?.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.UTF8);
        originalPassword !== request.body.password && response.status(401).json("Falsches Passwort")

        const accessToken = jwt.sign(
            {id: user!._id,
             isAdmin:user!.isAdmin,
            },
            sec,
            {expiresIn:"30d"}
        )
        const {password, ...others} = user?._doc;
        response.status(200).json({...others, accessToken});
    } catch(error:any){
        response.status(401)
        throw new Error(error)
    }
});

export default authRouter; 