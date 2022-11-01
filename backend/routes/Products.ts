import {Router, Request, Response} from 'express';
const productsRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import Products from '../models/products';

productsRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newproducts = new Products(req.body);
    try{
        const savedproducts = await newproducts.save();
        res.status(200).json(savedproducts);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
productsRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedproducts = await Products.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedproducts);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
productsRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await Products.findByIdAndDelete(req.params.id);
        res.status(200).json("products wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
productsRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const products = await Products.findById(req.params.id);
        res.status(200).json(products)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
productsRouter.get('/', async (req:Request, res:Response)=>{
    const qnew = req.query.new;
    const qCategory = req.query.category;
    try{
        let products;
        if(qnew){
            products = await Products.find().sort({createdAt:-1}).limit(1);
        } else if(qCategory){
            products = await Products.find({categories:{$in:[qCategory]}})
        } else{
            products = await Products.find();
        }
        
        res.status(200).json(products);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default productsRouter;

