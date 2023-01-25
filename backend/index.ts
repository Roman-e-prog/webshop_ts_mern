const express = require('express');
import { Router } from 'express';
import colors from 'colors';
import * as dotenv from 'dotenv';
// const bodyParser = require('body-parser')
dotenv.config({path:__dirname+'/.env'});
const app = express();
import {dbConnect} from './config/dbConnect';
const port = process.env.PORT || 8000;
import cors from 'cors';
import {errorHandler} from './middleware/errorMiddleware';
import path from 'path';
import authRouter from './routes/Auth';
import userRouter from './routes/User'
import cardImagesRouter from './routes/CardImages';
import descriptionItemRouter from './routes/DescriptionItems';
import newsletterBackgroundRouter from './routes/NewsletterBackground';
import productListChildRouter from './routes/ProductListChild';
import productListMenRouter from './routes/ProductListMen';
import productListSneakerRouter from './routes/ProductListSneaker';
import productListSportschuheRouter from './routes/ProductListSportschuhe';
import productListWomenRouter from './routes/ProductListWomen';
import productsRouter from './routes/Products';
import sliderItemsRouter from './routes/SliderItems';
import sneakerImageRouter from './routes/SneakerImage';
import cartRouter from './routes/Cart';
import orderRouter from './routes/Order';
import stripeRouter from './routes/Stripe';
import newsletterOrderRouter from './routes/NewsletterOrder';
const routes = Router();
dbConnect();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));
// app.use(multer());
app.use(errorHandler);

routes.use('/api/auth', authRouter);
routes.use('/api/user', userRouter);
routes.use('/api/cardImages', cardImagesRouter);
routes.use('/api/descriptionItem', descriptionItemRouter);
routes.use('/api/newsletterBackground', newsletterBackgroundRouter);
routes.use('/api/productListChild', productListChildRouter);
routes.use('/api/productListMen', productListMenRouter);
routes.use('/api/productListSneaker', productListSneakerRouter);
routes.use('/api/productListSportschuhe', productListSportschuheRouter);
routes.use('/api/productListWomen', productListWomenRouter);
routes.use('/api/products', productsRouter);
routes.use('/api/sliderItem', sliderItemsRouter);
routes.use('/api/sneakerImage', sneakerImageRouter);
routes.use('/api/cart', cartRouter);
routes.use('/api/order', orderRouter);
routes.use('/api/checkout', stripeRouter);
routes.use('/api/newsletterOrder', newsletterOrderRouter);
app.use(routes);
app.use(express.static(path.resolve(process.cwd(),'admin/public/' )))
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
});

