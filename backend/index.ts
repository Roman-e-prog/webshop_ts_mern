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
import * as authRoute from './routes/Auth';
import path from 'path';
dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(errorHandler);
app.use('/api/auth', authRoute);

app.use(express.static(path.resolve(process.cwd(),'/frontend/public' )))
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
});

