import {Router, Request, Response} from 'express';
const productListSneakerRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import ProductListSneaker from '../models/productListSneaker';

productListSneakerRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newproductListSneaker = new ProductListSneaker(req.body);
    try{
        const savedproductListSneaker = await newproductListSneaker.save();
        res.status(200).json(savedproductListSneaker);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
productListSneakerRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedproductListSneaker = await ProductListSneaker.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedproductListSneaker);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
productListSneakerRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await ProductListSneaker.findByIdAndDelete(req.params.id);
        res.status(200).json("productListSneaker wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
productListSneakerRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const productListSneaker = await ProductListSneaker.findById(req.params.id);
        res.status(200).json(productListSneaker)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
productListSneakerRouter.get('/find', async (req:Request, res:Response)=>{
    try{
        const allproductListSneaker = await ProductListSneaker.find();
        res.status(200).json(allproductListSneaker)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default productListSneakerRouter;

