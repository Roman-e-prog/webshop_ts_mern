import mongoose from "mongoose";
export interface OrderDocument extends mongoose.Document{
    userId:string;
    products:[string,number];
    amount:number;
    address:object;
    status:string;
    createdAt: Date;
    updatedAt: Date;
  };
const OrderSchema = new mongoose.Schema<OrderDocument>({
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
    ],
    amount:{type:Number, required:true},
    address:{type:Object, required:true},
    status:{type:String, required:true, default:"pending"}
},
{timestamps:true}
)
const Order = mongoose.model<OrderDocument>("Order", OrderSchema);

export default Order;