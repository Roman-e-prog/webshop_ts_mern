import {Router, Request, Response} from 'express';
import { Stripe } from 'stripe';
const stripeRouter = Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);


stripeRouter.post('/payment', async (req, res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"€",
    },(stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
        }
    })
})

export default stripeRouter;