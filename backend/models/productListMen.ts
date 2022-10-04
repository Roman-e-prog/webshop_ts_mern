import mongoose from 'mongoose';
export interface ProductListMenDocument extends mongoose.Document{
    title:string;
    content:string[];
    createdAt: Date;
    updatedAt: Date;
  };
  const ProductListMenSchema = new mongoose.Schema<ProductListMenDocument>({
    title:{type:String, required:true, default:"Schuhe"},
    content:{type:[String], required:true},
  },
  {timestamps:true},
  );
  const ProductListMen = mongoose.model<ProductListMenDocument>("ProductListMen", ProductListMenSchema);

  export default ProductListMen;