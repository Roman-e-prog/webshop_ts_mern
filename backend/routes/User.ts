import { Router, Request, Response } from "express";
const userRouter = Router();
import User from '../models/user';
import * as CryptoJS from 'crypto-js';
import {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} from '../middleware/jwtVerify';

userRouter.put('/:id', verifyTokenAndAuthorization, async (req:Request, res:Response)=>{
    const pass_sec = process.env.PASS_SEC as string;
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            pass_sec,
        ).toString();
    }
    try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set: req.body,
    },{new:true})
        res.status(200).json(updatedUser);
    } catch(error){
        res.status(404)
        throw new Error("Benutzer nicht gefunden");
    }
});
userRouter.delete('/:id', verifyTokenAndAuthorization, async(req:Request, res:Response)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('Benutzer wurde gelöscht');
    } catch(error){
        res.status(404).json("Benutzer nicht gefunden");
    }
});
userRouter.get('/find/:id', verifyTokenAndAuthorization, async (req:Request, res:Response)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user?._doc;
        res.status(200).json(others);
    } catch(error){
        res.status(404).json("Benutzer nicht gefunden");
    }
})
userRouter.get('/find', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const allUsers = await User.find();
        res.status(200).json(allUsers)
    } catch(error){
        res.status(404).json("Benutzer nicht gefunden");
    }
});
//



