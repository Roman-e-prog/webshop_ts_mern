const express = require('express');
import colors from 'colors';
import * as dotenv from 'dotenv';
dotenv.config({path:__dirname+'/.env'});
console.log(process.env.Mongo_URL);
const app = express();
import {dbConnect} from './config/dbConnect';
const port = process.env.PORT || 8000;
import cors from 'cors';
import {errorHandler} from './middleware/errorMiddleware';
import path from 'path';
import * as authRoute from './routes/Auth';
import * as userRoute from './routes/User'
import * as cardImagesRoute from './routes/CardImages';
import * as descriptionItemRoute from './routes/DescriptionItems';
import * as newsletterBackgroundRoute from './routes/NewsletterBackground';
import * as productListChildRoute from './routes/ProductListChild';
import * as productListMenRoute from './routes/ProductListMen';
import * as productListSneakerRoute from './routes/ProductListSneaker';
import * as productListSportschuheRoute from './routes/ProductListSportschuhe';
import * as productListWomenRoute from './routes/ProductListWomen';
dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(errorHandler);

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/cardImages', cardImagesRoute);
app.use('/api/descriptionItem', descriptionItemRoute);
app.use('/api/newsletterBackground', newsletterBackgroundRoute);
app.use('/api/productListChild', productListChildRoute);
app.use('/api/productListMen', productListMenRoute);
app.use('/api/productListSneaker', productListSneakerRoute);
app.use('/api/productListSportschuhe', productListSportschuheRoute);
app.use('/api/productListWomen', productListWomenRoute);

app.use(express.static(path.resolve(process.cwd(),'/frontend/public' )))
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
});

