import multer,{FileFilterCallback} from 'multer'
import { Request } from 'express';
import path from 'path';
import { cwd } from 'process';
type DestinationCallback = (error:Error | null, destination:string)=>void;
type FileNameCallback = (error: Error | null, filename: string) => void
const storage = multer.diskStorage({
    destination:(req:Request,file:Express.Multer.File,callback:DestinationCallback):void=>{
        callback(null, path.resolve(process.cwd(), '/frontend/public/uploads'))
    }
})