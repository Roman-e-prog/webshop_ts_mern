import {Router, Request, Response} from 'express';
const productListChildRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import ProductListChild from '../models/productListChild';

productListChildRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newproductListChild = new ProductListChild(req.body);
    try{
        const savedproductListChild = await newproductListChild.save();
        res.status(200).json(savedproductListChild);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
productListChildRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedproductListChild = await ProductListChild.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedproductListChild);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
productListChildRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await ProductListChild.findByIdAndDelete(req.params.id);
        res.status(200).json("productListChild wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
productListChildRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const productListChild = await ProductListChild.findById(req.params.id);
        res.status(200).json(productListChild)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
productListChildRouter.get('/find', async (req:Request, res:Response)=>{
    try{
        const allproductListChild = await ProductListChild.find();
        res.status(200).json(allproductListChild)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default productListChildRouter;

