import * as express from 'express';
import colors from 'colors';
import * as dotenv from 'dotenv';
dotenv.config({path:__dirname+'/env'});
console.log(process.env)
const app = express();
import {dbConnect} from './config/dbConnect';
const port = process.env.PORT || 8000;
import cors from 'cors';
import {errorHandler} from './middleware/errorMiddleware';
dbConnect();
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(errorHandler);

