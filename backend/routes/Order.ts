import { Router, Request, Response } from "express";
const orderRouter = Router();
import Order from "../models/order";
import {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} from '../middleware/jwtVerify';

orderRouter.post('/', verifyToken, async (req:Request, res:Response)=>{
    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch(error){
        res.status(401).json(error)
    }
});
orderRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true});
        res.status(200).json(updatedOrder);
    }catch(error){
        res.status(404).json("not found")
    }
});
orderRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Einkaufswagen wurde gelöscht");
    }catch(error){
        res.status(404).json("not found")
    }
});
orderRouter.get('/find/:id', verifyTokenAndAuthorization, async (req:Request, res:Response)=>{
    try{
        const order = await Order.find({userId: req.params.userId});
        res.status(200).json(order);
    }catch(error){
        res.status(403).json("Forbidden");
    }
});
orderRouter.get('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const allOrders = await Order.find();
        res.status(200).json(allOrders);
    }catch(error){
        res.status(404).json("Not found");
    }
});
//Get monthly income
orderRouter.get('/income', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try{
        const income = await Order.aggregate([
            {$match:{createdAt:{$gte: previousMonth}}},
            {$project: {
                month: {$month: "$createdAt"},
                sales: "$amount"
            }},
            {$group: {
                _id: "$month",
                total:{$sum: "$sales"},
            }},
        ]);
        res.status(200).json(income);
    }catch(error){
        res.status(404).json("Not found");
    }
})
export default orderRouter;
