import mongoose from 'mongoose';
export interface ProductListWomenDocument extends mongoose.Document{
    title:string;
    content:string[];
    createdAt: Date;
    updatedAt: Date;
  };
  const ProductListWomenSchema = new mongoose.Schema<ProductListWomenDocument>({
    title:{type:String, required:true, default:"Schuhe"},
    content:{type:[String], required:true},
  },
  {timestamps:true},
  );
  const ProductListWomen = mongoose.model<ProductListWomenDocument>("ProductListWomen", ProductListWomenSchema);

  export default ProductListWomen;