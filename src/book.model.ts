import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Book = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
    unique: false,
  },
  phone: {
    type: String,
    required: false,
    unique: false,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
});

Book.plugin(uniqueValidator);
export default mongoose.model("Book", Book);
