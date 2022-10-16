import {Router, Request, Response} from 'express';
const productsChildRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import ProductsChild from '../models/productsChild';

productsChildRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newproductsChild = new ProductsChild(req.body);
    try{
        const savedproductsChild = await newproductsChild.save();
        res.status(200).json(savedproductsChild);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
productsChildRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedproductsChild = await ProductsChild.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedproductsChild);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
productsChildRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await ProductsChild.findByIdAndDelete(req.params.id);
        res.status(200).json("productsChild wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
productsChildRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const productsChild = await ProductsChild.findById(req.params.id);
        res.status(200).json(productsChild)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
productsChildRouter.get('/', async (req:Request, res:Response)=>{
    const qnew = req.query.new;
    const qCategory = req.query.category;
    try{
        let productsChild;
        if(qnew){
            productsChild = await ProductsChild.find().sort({createdAt:-1}).limit(1);
        } else if(qCategory){
            productsChild = await ProductsChild.find({categories:{$in:[qCategory]}})
        } else{
            productsChild = await ProductsChild.find();
        }
        
        res.status(200).json(productsChild);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default productsChildRouter;

