import mongoose from "mongoose";
export interface CartDocument extends mongoose.Document{
    userId:string;
    products:[string,number];
    createdAt: Date;
    updatedAt: Date;
  };
const CartSchema = new mongoose.Schema<CartDocument>({
    userId:{type:String, required:true},
    products:[
        {
            productId:{
                type:String,
            },
            quantity:{
                type:String,
                default:1
            }
        }
    ]
},
{timestamps:true}
)
const Cart = mongoose.model<CartDocument>("Cart", CartSchema);

export default Cart;