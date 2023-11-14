import { gql } from "apollo-server";

const typeDefs = gql`
  enum HasPhone {
    YES
    NO
  }

  type Book {
    title: String
    author: String
    phone: String
    id: ID!
  }

  type Query {
    booksList: [Book]
    booksCount: Int!
    findBook(title: String!): Book
    findByPhone(phone: HasPhone): [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!, phone: String, id: ID): Book
    updatePhone(title: String!, phone: String!): Book
  }

  type Subscription {
    bookAdded: Book!
  }
`;

export default typeDefs;
