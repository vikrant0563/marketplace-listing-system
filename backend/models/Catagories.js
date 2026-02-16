import mongoose,{Schema} from "mongoose";

const catagorySchema = new Schema({

    name: {
    type: String,
    required: true,
    unique: true
  },

},{timestamps:true});

export const Category = mongoose.model('Category',catagorySchema)