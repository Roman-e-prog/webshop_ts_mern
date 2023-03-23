const express = require('express');
import { Router } from 'express';
import * as dotenv from 'dotenv';
dotenv.config({path:__dirname+'/.env'});
const app = express();
import {dbConnect} from './config/dbConnect';
const port = process.env.PORT || 8000;
import cors from 'cors';
import {errorHandler} from './middleware/errorMiddleware';
import path from 'path';
import authRouter from './routes/Auth';
import userRouter from './routes/User'
import descriptionItemRouter from './routes/DescriptionItems';
import productsRouter from './routes/Products';
import sliderItemsRouter from './routes/SliderItems';
import cartRouter from './routes/Cart';
import orderRouter from './routes/Order';
import stripeRouter from './routes/Stripe';
import newsletterOrderRouter from './routes/NewsletterOrder';
import wishlistRouter from './routes/Wishlist';
import messagesRouter from './routes/Messages';

const routes = Router();
dbConnect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(errorHandler);

routes.use('/api/auth', authRouter);
routes.use('/api/user', userRouter);
routes.use('/api/descriptionItem', descriptionItemRouter);
routes.use('/api/products', productsRouter);
routes.use('/api/sliderItem', sliderItemsRouter);
routes.use('/api/cartdata', cartRouter);
routes.use('/api/orderdata', orderRouter);
routes.use('/api/checkout', stripeRouter);
routes.use('/api/newsletterOrder', newsletterOrderRouter);
routes.use('/api/wishlist', wishlistRouter);
routes.use('/api/messages', messagesRouter);
app.use(routes);
app.use(express.static(path.resolve(process.cwd(),'admin/public/' )))
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
});

