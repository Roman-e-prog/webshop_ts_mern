import mongoose from 'mongoose';
interface ProductsSneakerDocument extends mongoose.Document{
    img:string,
    cloudinary_id:string,
    title:string,
    producer:string,
    category:string,
    desc:string,
    price:number,
    currency:string,
    colors:string[],
    sizes:string[],
    inStock:boolean,
    createdAt: Date;
    updatedAt: Date;
}
const ProductsSneakerSchema = new mongoose.Schema<ProductsSneakerDocument>({
    img:{type:String, required:true},
    cloudinary_id:{type:String, required:true},
    title:{type:String, required:true},
    producer:{type:String, required:true},
    category:{type:String, required:true},
    desc:{type:String, required:true},
    price:{type:Number, required:true},
    currency:{type:String, required:true, default:"€"},
    colors:{type:[String], required:true},
    sizes:{type:[String], required:true},
    inStock:{type:Boolean, required:true, default:true}
},
{timestamps:true}
);
const ProductsSneaker = mongoose.model<ProductsSneakerDocument>("ProductsSneaker", ProductsSneakerSchema);

export default ProductsSneaker;