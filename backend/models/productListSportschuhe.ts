import mongoose from 'mongoose';
export interface ProductListSportschuheDocument extends mongoose.Document{
    title:string;
    content:string[];
    createdAt: Date;
    updatedAt: Date;
  };
  const ProductListSportschuheSchema = new mongoose.Schema<ProductListSportschuheDocument>({
    title:{type:String, required:true, default:"Sportschuhe"},
    content:{type:[String], required:true},
  },
  {timestamps:true},
  );
  const ProductListSportschuhe = mongoose.model<ProductListSportschuheDocument>("ProductListSportschuhe", ProductListSportschuheSchema);

  export default ProductListSportschuhe;