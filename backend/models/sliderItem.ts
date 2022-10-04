import mongoose from 'mongoose';
export interface SliderItemDocument extends mongoose.Document{
    img:string;
    alt:string;
    title:string;
    createdAt: Date;
    updatedAt: Date;
  };
  const SliderItemSchema = new mongoose.Schema<SliderItemDocument>({
    img:{type:String, required:true},
    alt:{type:String, required:true},
    title:{type:String, required:true},
    
  },
  {timestamps:true},
  );
  const SliderItem = mongoose.model<SliderItemDocument>("SliderItem", SliderItemSchema);

  export default SliderItem;