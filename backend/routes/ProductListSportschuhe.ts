import {Router, Request, Response} from 'express';
const productListSportschuheRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import ProductListSportschuhe from '../models/productListSportschuhe';

productListSportschuheRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newproductListSportschuhe = new ProductListSportschuhe(req.body);
    try{
        const savedproductListSportschuhe = await newproductListSportschuhe.save();
        res.status(200).json(savedproductListSportschuhe);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
productListSportschuheRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedproductListSportschuhe = await ProductListSportschuhe.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedproductListSportschuhe);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
productListSportschuheRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await ProductListSportschuhe.findByIdAndDelete(req.params.id);
        res.status(200).json("productListSportschuhe wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
productListSportschuheRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const productListSportschuhe = await ProductListSportschuhe.findById(req.params.id);
        res.status(200).json(productListSportschuhe)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
productListSportschuheRouter.get('/find', async (req:Request, res:Response)=>{
    try{
        const allproductListSportschuhe = await ProductListSportschuhe.find();
        res.status(200).json(allproductListSportschuhe)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default productListSportschuheRouter;

