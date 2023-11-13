import dotenv from "dotenv";
import Book from "./book.model.js";
import { v1 as uuid } from "uuid";

dotenv.config();

const resolvers = {
  Query: {
    booksList: async () => {
      return Book.find({});
    },
    booksCount: async () => Book.collection.countDocuments(),
    findBook: async (root, args) => {
      const { title } = args;
      return Book.findOne({ title: title });
    },
    findByPhone: async (root, args) => {
      const { phone } = args;
      if (!phone) return Book.find({});
      return Book.find({ phone: { $exists: phone === "YES" } });
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const newId = uuid();
      const newBook = new Book({ ...args, id: newId });
      return newBook.save();
    },
    updatePhone: async (root, args) => {
      const book = await Book.findOne({ title: args.title });
      book.phone = args.phone;
      return book.save();
    },
  },
};

export default resolvers;
