import mongoose from "mongoose";
export interface CartDocument extends mongoose.Document{
    user:object;
    cartProduct:object;
    amount:number,
    quantity:number,
    createdAt: Date;
    updatedAt: Date;
  };
const CartSchema = new mongoose.Schema<CartDocument>({
    user:{type:Object, required:true},
    cartProduct:{type:Object, required:true},
    amount:{type:Number, required:true},
    quantity:{type:Number, required:true},
},
{timestamps:true}
)
const Cart = mongoose.model<CartDocument>("Cart", CartSchema);

export default Cart;