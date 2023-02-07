import mongoose from "mongoose";

interface WishlistDocument extends mongoose.Document{
    product:object,
    userId:string,
    size:number,
    color:string,
    quantity:number,
    createdAt: Date;
    updatedAt: Date;
}
const WishlistSchema = new mongoose.Schema<WishlistDocument>({
   product:{type:Object, required:true},
   userId:{type:String, required:true},
   size:{type:Number, required:true},
   quantity:{type:Number, required:true},
   color:{type:String, required:true},
},
{timestamps:true}
);
const Wishlist = mongoose.model<WishlistDocument>("Wishlist", WishlistSchema);

export default Wishlist;