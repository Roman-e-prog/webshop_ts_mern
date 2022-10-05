import {Router, Request, Response} from 'express';
const cardImageRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import CardImages from '../models/cardImages';
cardImageRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newCardImages = new CardImages(req.body);
    try{
        const savedCardImages = await newCardImages.save();
        res.status(200).json(savedCardImages);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
cardImageRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedCardImage = await CardImages.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedCardImage);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
cardImageRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await CardImages.findByIdAndDelete(req.params.id);
        res.status(200).json("CardImage wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
cardImageRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const cardImage = await CardImages.findById(req.params.id);
        res.status(200).json(cardImage)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get
cardImageRouter.get('/find', async (req:Request, res:Response)=>{
    try{
        const allCardImages = await CardImages.find();
        res.status(200).json(allCardImages)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

