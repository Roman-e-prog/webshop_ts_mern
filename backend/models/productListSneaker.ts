import mongoose from 'mongoose';
export interface ProductListSneakerDocument extends mongoose.Document{
    title:string;
    content:string[];
    createdAt: Date;
    updatedAt: Date;
  };
  const ProductListSneakerSchema = new mongoose.Schema<ProductListSneakerDocument>({
    title:{type:String, required:true, default:"Sneaker"},
    content:{type:[String], required:true},
  },
  {timestamps:true},
  );
  const ProductListSneaker = mongoose.model<ProductListSneakerDocument>("ProductListSneaker", ProductListSneakerSchema);

  export default ProductListSneaker;