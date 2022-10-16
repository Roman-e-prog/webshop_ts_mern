import {Router, Request, Response} from 'express';
const productsSneakerRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import ProductsSneaker from '../models/productsSneaker';

productsSneakerRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newproductsSneaker = new ProductsSneaker(req.body);
    try{
        const savedproductsSneaker = await newproductsSneaker.save();
        res.status(200).json(savedproductsSneaker);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
productsSneakerRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedproductsSneaker = await ProductsSneaker.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedproductsSneaker);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
productsSneakerRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await ProductsSneaker.findByIdAndDelete(req.params.id);
        res.status(200).json("productsSneaker wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
productsSneakerRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const productsSneaker = await ProductsSneaker.findById(req.params.id);
        res.status(200).json(productsSneaker)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
productsSneakerRouter.get('/', async (req:Request, res:Response)=>{
    const qnew = req.query.new;
    const qCategory = req.query.category;
    try{
        let productsSneaker;
        if(qnew){
            productsSneaker = await ProductsSneaker.find().sort({createdAt:-1}).limit(1);
        } else if(qCategory){
            productsSneaker = await ProductsSneaker.find({categories:{$in:[qCategory]}})
        } else{
            productsSneaker = await ProductsSneaker.find();
        }
        
        res.status(200).json(productsSneaker);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default productsSneakerRouter;

