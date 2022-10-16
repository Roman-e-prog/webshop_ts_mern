import mongoose from 'mongoose';
export interface NewsletterBackgroundDocument extends mongoose.Document{
    img:string;
    // cloudinary_id:string;
    createdAt: Date;
    updatedAt: Date;
  };
  const NewsletterBackgroundSchema = new mongoose.Schema<NewsletterBackgroundDocument>({
    img:{type:String, required:true},
    // cloudinary_id:{type:String, required:true},
  },
  {timestamps:true},
  );
  const NewsletterBackground = mongoose.model<NewsletterBackgroundDocument>("NewsletterBackground", NewsletterBackgroundSchema);

  export default NewsletterBackground;