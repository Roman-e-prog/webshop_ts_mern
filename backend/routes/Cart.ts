import { Router, Request, Response } from "express";
const cartRouter = Router();
import Cart from "../models/cart";
import {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} from '../middleware/jwtVerify';

cartRouter.post('/', verifyToken, async (req:Request, res:Response)=>{
    const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch(error){
        res.status(401).json(error)
    }
});
cartRouter.put('/:id', verifyTokenAndAuthorization, async (req:Request, res:Response)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true});
        res.status(200).json(updatedCart);
    }catch(error){
        res.status(404).json("not found")
    }
});
cartRouter.delete('/:id', verifyTokenAndAuthorization, async (req:Request, res:Response)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Einkaufswagen wurde gelöscht");
    }catch(error){
        res.status(404).json("not found")
    }
});
cartRouter.get('/find/:id', verifyTokenAndAuthorization, async (req:Request, res:Response)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    }catch(error){
        res.status(403).json("Forbidden");
    }
});
cartRouter.get('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const allCarts = await Cart.find();
        res.status(200).json(allCarts);
    }catch(error){
        res.status(404).json("Not found");
    }
})
