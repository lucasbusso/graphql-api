import { v1 as uuid } from "uuid";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiUrl = process.env.JSON_SERVER_URL;

const resolvers = {
  Query: {
    booksList: async () => {
      const response = await axios.get(apiUrl);
      const { data } = response;
      return data;
    },
    booksCount: async () => {
      const response = await axios.get(apiUrl);
      const { data } = response;
      return data.length;
    },
    findBook: async (root, args) => {
      const { title } = args;
      const response = await axios.get(apiUrl);
      const { data } = response;
      return data.find((book) => book.title === title);
    },
    findByPhone: async (root, args) => {
      const response = await axios.get(apiUrl);
      const { data } = response;
      if (!args.phone) return data;

      const byPhone = (book) =>
        args.phone === "YES" ? book.phone : !book.phone;
      return data.filter(byPhone);
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const response = await axios.post(apiUrl, {
        title: args.title,
        author: args.author,
        phone: args.phone,
        id: uuid(),
      });
      const { data } = response;
      return data;
    },
    updatePhone: async (root, args) => {
      const { data } = await axios.get(apiUrl);
      const bookIndex = data.findIndex((book) => book.title === args.title);
      if (bookIndex === -1) return null;
      const updatedBook = { ...data[bookIndex], phone: args.phone };
      data[bookIndex] = updatedBook;
      await axios.put(`${apiUrl}/${updatedBook.id}`, updatedBook);
      return updatedBook;
    },
  },
};

export default resolvers;
