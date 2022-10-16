import mongoose from 'mongoose';
export interface SneakerImageDocument extends mongoose.Document{
    name:string;
    title:string;
    // cloudinary_id:string;
    img:string;
    createdAt: Date;
    updatedAt: Date;
  }
const SneakerImageSchema = new mongoose.Schema<SneakerImageDocument>({
     name:{type:String, required:true},
     title:{type:String, required:true},
     img:{type:String, required:true},
    //  cloudinary_id:{type:String, required:true},
},
{timestamps:true}
);
const SneakerImage = mongoose.model<SneakerImageDocument>("SneakerImage", SneakerImageSchema);

export default SneakerImage;