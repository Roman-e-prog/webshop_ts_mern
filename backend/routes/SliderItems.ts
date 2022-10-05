import {Router, Request, Response} from 'express';
const sliderItemRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import SliderItem from '../models/sliderItem';

sliderItemRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newsliderItem = new SliderItem(req.body);
    try{
        const savedsliderItem = await newsliderItem.save();
        res.status(200).json(savedsliderItem);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
sliderItemRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedsliderItem = await SliderItem.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedsliderItem);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
sliderItemRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await SliderItem.findByIdAndDelete(req.params.id);
        res.status(200).json("sliderItem wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
sliderItemRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const sliderItem = await SliderItem.findById(req.params.id);
        res.status(200).json(sliderItem)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
sliderItemRouter.get('/find', async (req:Request, res:Response)=>{
    try{
        const allsliderItem = await SliderItem.find();
        res.status(200).json(allsliderItem)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default sliderItemRouter;

