import {Router, Request, Response} from 'express';
const productsMenRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import ProductsMen from '../models/productsMen';

productsMenRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newproductsMen = new ProductsMen(req.body);
    try{
        const savedproductsMen = await newproductsMen.save();
        res.status(200).json(savedproductsMen);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
productsMenRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedproductsMen = await ProductsMen.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedproductsMen);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
productsMenRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await ProductsMen.findByIdAndDelete(req.params.id);
        res.status(200).json("productsMen wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
productsMenRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const productsMen = await ProductsMen.findById(req.params.id);
        res.status(200).json(productsMen)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
productsMenRouter.get('/find', async (req:Request, res:Response)=>{
    try{
        const allproductsMen = await ProductsMen.find();
        res.status(200).json(allproductsMen)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default productsMenRouter;

