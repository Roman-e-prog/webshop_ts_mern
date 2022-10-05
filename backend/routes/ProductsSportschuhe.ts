import {Router, Request, Response} from 'express';
const productsSportschuheRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import ProductsSportschuhe from '../models/productsSportschuhe';

productsSportschuheRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newproductsSportschuhe = new ProductsSportschuhe(req.body);
    try{
        const savedproductsSportschuhe = await newproductsSportschuhe.save();
        res.status(200).json(savedproductsSportschuhe);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
productsSportschuheRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedproductsSportschuhe = await ProductsSportschuhe.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedproductsSportschuhe);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
productsSportschuheRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await ProductsSportschuhe.findByIdAndDelete(req.params.id);
        res.status(200).json("productsSportschuhe wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
productsSportschuheRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const productsSportschuhe = await ProductsSportschuhe.findById(req.params.id);
        res.status(200).json(productsSportschuhe)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
productsSportschuheRouter.get('/find', async (req:Request, res:Response)=>{
    try{
        const allproductsSportschuhe = await ProductsSportschuhe.find();
        res.status(200).json(allproductsSportschuhe)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default productsSportschuheRouter;

