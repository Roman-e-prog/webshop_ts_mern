import {Router, Request, Response} from 'express';
const productListMenRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import ProductListMen from '../models/productListMen';

productListMenRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newproductListMen = new ProductListMen(req.body);
    try{
        const savedproductListMen = await newproductListMen.save();
        res.status(200).json(savedproductListMen);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
productListMenRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedproductListMen = await ProductListMen.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedproductListMen);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
productListMenRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await ProductListMen.findByIdAndDelete(req.params.id);
        res.status(200).json("productListMen wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
productListMenRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const productListMen = await ProductListMen.findById(req.params.id);
        res.status(200).json(productListMen)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
productListMenRouter.get('/find', async (req:Request, res:Response)=>{
    try{
        const allproductListMen = await ProductListMen.find();
        res.status(200).json(allproductListMen)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default productListMenRouter;

