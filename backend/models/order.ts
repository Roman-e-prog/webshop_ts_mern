import mongoose from "mongoose";
export interface OrderDocument extends mongoose.Document{
    user:object
    cartproduct:object;
    amount:number;
    createdAt: Date;
    updatedAt: Date;
  };
const OrderSchema = new mongoose.Schema<OrderDocument>({
    user:{type:Object, required:true},
    cartproduct:{type:Object, required:true},
    amount:{type:Number, required:true},
},
{timestamps:true}
);
const Order = mongoose.model<OrderDocument>("Order", OrderSchema);

export default Order;