import mongoose from 'mongoose';
export interface ProductListChildDocument extends mongoose.Document{
    title:string;
    content:string[];
    createdAt: Date;
    updatedAt: Date;
  };
  const ProductListChildSchema = new mongoose.Schema<ProductListChildDocument>({
    title:{type:String, required:true, default:"Schuhe"},
    content:{type:[String], required:true},
  },
  {timestamps:true},
  );
  const ProductListChild = mongoose.model<ProductListChildDocument>("ProductListChild", ProductListChildSchema);

  export default ProductListChild;