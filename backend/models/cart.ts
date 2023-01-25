import mongoose from "mongoose";
export interface CartDocument extends mongoose.Document{
    userId:string;
    products:[{}];
    createdAt: Date;
    updatedAt: Date;
  };
const CartSchema = new mongoose.Schema<CartDocument>({
    userId:{type:String, required:true},
    products:[
        {
            productId:{type:String, required:true},
            image:{type:String, required:true},
            title:{type:String, required:true},
            producer:{type:String, required:true},
            desc:{type:String, required:true},
            price:{type:String, required:true},
            currency:{type:String, required:true},
            size:{type:String, required:true},
            color:{type:String, required:true},
            quantity:{type:Number,default:1},
            
        }
    ]
},
{timestamps:true}
)
const Cart = mongoose.model<CartDocument>("Cart", CartSchema);

export default Cart;