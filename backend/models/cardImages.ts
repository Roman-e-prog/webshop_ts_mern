import mongoose from 'mongoose';
export interface CardImagesDocument extends mongoose.Document{
    name:string;
    title:string;
    cloudinary_id:string;
    img:string;
    createdAt: Date;
    updatedAt: Date;
    _doc?: any;
  }
const CardImagesSchema = new mongoose.Schema<CardImagesDocument>({
    name:{type:String, required:true},
    title:{type:String, required:true},
    cloudinary_id:{type:String, required:true},
    img:{type:String, required:true},
},
    {timestamps:true}
);

const CardImages = mongoose.model<CardImagesDocument>("CardImages", CardImagesSchema);

export default CardImages;