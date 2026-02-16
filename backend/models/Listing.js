import mongoose,{Schema} from "mongoose";

const ListingSchema = new Schema({

  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  images: [
    {
      url: String,  
      filename: String
    }
  ],

  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  location: {
    city: String,
    state: String
  },

},{timestamps:true})

export const Listing = mongoose.model('Listing',ListingSchema);

