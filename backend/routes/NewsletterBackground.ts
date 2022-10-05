import {Router, Request, Response} from 'express';
const newsletterBackgroundRouter = Router();
import {verifyTokenAndAdmin} from '../middleware/jwtVerify';
import NewsletterBackground from '../models/newsletterBackground';

newsletterBackgroundRouter.post('/', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    const newNewsletterBackground = new NewsletterBackground(req.body);
    try{
        const savedNewsletterBackground = await newNewsletterBackground.save();
        res.status(200).json(savedNewsletterBackground);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
newsletterBackgroundRouter.put('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        const updatedNewsletterBackground = await NewsletterBackground.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true})
        res.status(200).json(updatedNewsletterBackground);
    } catch(error){
        res.status(404)
        throw new Error('Nicht gefunden')
    }
});
//delete
newsletterBackgroundRouter.delete('/:id', verifyTokenAndAdmin, async (req:Request, res:Response)=>{
    try{
        await NewsletterBackground.findByIdAndDelete(req.params.id);
        res.status(200).json("NewsletterBackground wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
newsletterBackgroundRouter.get('/find/:id', async (req:Request, res:Response)=>{
    try{
        const newsletterBackground = await NewsletterBackground.findById(req.params.id);
        res.status(200).json(newsletterBackground)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get All
newsletterBackgroundRouter.get('/find', async (req:Request, res:Response)=>{
    try{
        const allnewsletterBackground = await NewsletterBackground.find();
        res.status(200).json(allnewsletterBackground)
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})

export default newsletterBackgroundRouter;

