import {Router, Request, Response} from 'express';
const sneakerImageRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import SneakerImage from '../models/sneakerImage';

sneakerImageRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newsneakerImage = new SneakerImage(req.body);
    try{
        const savedsneakerImage = await newsneakerImage.save();
        res.status(200).json(savedsneakerImage);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
sneakerImageRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedsneakerImage = await SneakerImage.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedsneakerImage);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
sneakerImageRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await SneakerImage.findByIdAndDelete(req.params.id);
        res.status(200).json("sneakerImage wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
sneakerImageRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const sneakerImage = await SneakerImage.findById(req.params.id);
        res.status(200).json(sneakerImage)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
sneakerImageRouter.get('/find', async (req:Request, res:Response)=>{
    try{
        const allsneakerImage = await SneakerImage.find();
        res.status(200).json(allsneakerImage)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default sneakerImageRouter;

