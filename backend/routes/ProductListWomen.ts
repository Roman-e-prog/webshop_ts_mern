import {Router, Request, Response} from 'express';
const productListWomenRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import ProductListWomen from '../models/productListWomen';

productListWomenRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newproductListWomen = new ProductListWomen(req.body);
    try{
        const savedproductListWomen = await newproductListWomen.save();
        res.status(200).json(savedproductListWomen);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
productListWomenRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedproductListWomen = await ProductListWomen.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedproductListWomen);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
productListWomenRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await ProductListWomen.findByIdAndDelete(req.params.id);
        res.status(200).json("productListWomen wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
productListWomenRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const productListWomen = await ProductListWomen.findById(req.params.id);
        res.status(200).json(productListWomen)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
productListWomenRouter.get('/find', async (req:Request, res:Response)=>{
    try{
        const allproductListWomen = await ProductListWomen.find();
        res.status(200).json(allproductListWomen)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default productListWomenRouter;

