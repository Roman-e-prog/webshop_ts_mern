import {Router, Request, Response} from 'express';
const productsWomenRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import ProductsWomen from '../models/productsWomen';

productsWomenRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newproductsWomen = new ProductsWomen(req.body);
    try{
        const savedproductsWomen = await newproductsWomen.save();
        res.status(200).json(savedproductsWomen);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
productsWomenRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedproductsWomen = await ProductsWomen.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedproductsWomen);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
productsWomenRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await ProductsWomen.findByIdAndDelete(req.params.id);
        res.status(200).json("productsWomen wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
productsWomenRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const productsWomen = await ProductsWomen.findById(req.params.id);
        res.status(200).json(productsWomen)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
productsWomenRouter.get('/', async (req:Request, res:Response)=>{
    const qnew = req.query.new;
    const qCategory = req.query.category;
    try{
        let productsWomen;
        if(qnew){
            productsWomen = await ProductsWomen.find().sort({createdAt:-1}).limit(1);
        } else if(qCategory){
            productsWomen = await ProductsWomen.find({categories:{$in:[qCategory]}})
        } else{
            productsWomen = await ProductsWomen.find();
        }
        
        res.status(200).json(productsWomen);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default productsWomenRouter;

