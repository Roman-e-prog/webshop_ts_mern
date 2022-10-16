import mongoose from 'mongoose';
interface ProductsWomenDocument extends mongoose.Document{
    img:string,
    cloudinary_id:string,
    title:string,
    producer:string,
    categories:string[],
    desc:string,
    price:number,
    currency:string,
    colors:string[],
    sizes:string[],
    inStock:boolean,
    createdAt: Date;
    updatedAt: Date;
}
const ProductsWomenSchema = new mongoose.Schema<ProductsWomenDocument>({
    img:{type:String, required:true},
    cloudinary_id:{type:String, required:true},
    title:{type:String, required:true},
    producer:{type:String, required:true},
    categories:{type:[String]},
    desc:{type:String, required:true},
    price:{type:Number, required:true},
    currency:{type:String, required:true, default:"€"},
    colors:{type:[String], required:true},
    sizes:{type:[String], required:true},
    inStock:{type:Boolean, required:true, default:true}
},
{timestamps:true}
);
const ProductsWomen = mongoose.model<ProductsWomenDocument>("ProductsWomen", ProductsWomenSchema);

export default ProductsWomen;