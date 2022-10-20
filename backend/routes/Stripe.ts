import {Router, Request,Response} from 'express'
const stripe = require('stripe')(process.env.STRIPE_KEY);
const stripeRouter = Router();


stripeRouter.post('/payment', async (req:Request, res:Response)=>{
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cart',
    });
  
    res.json({session:session.url});
});

export default stripeRouter;