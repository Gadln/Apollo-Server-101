import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  buildSchema,
} from "type-graphql";


@ObjectType()
class Book {
    @Field()
    id: string
    @Field()
    title: string
    @Field()
    author: string
}


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// const typeDefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     id: ID,
//     title: String
//     author: String
//   }

//   type Mutation {
//   addBook(title: String, author: String): Book
// }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//     getBookById(bookId: ID): Book
//   }
// `;

const books: Book[] = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
    id: "1",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    id: "2",
  },
];


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
// const resolvers = {
//   Query: {
//     books: () => books,
//     getBookById: (_: any, args: any) => books.find((book) => book.id == args.bookId)
//   },
//   Mutation: {
//     addBook: (_: any, args: any) => {
//       const lastBook = books.at(-1);
//       const lastId = lastBook ? parseInt(lastBook.id, 10) : 0;
//       const newId = (lastId + 1).toString();
//       books.push({
//         title: args.title,
//         author: args.author,
//         id: newId,
//       });
//       return books.at(-1);
//     },
//   },
// };

@InputType()
class BookInput {
  @Field()
  title: string;

  @Field()
  author: string;
}

@Resolver(Book)
class BookResolver {
  @Query(() => [Book])
  books() {
    return books;
  }

  @Query(() => Book)
  getBookById(@Arg("id") id: string) {
    return books.find((book) => book.id == id);
  }

  @Mutation(() => Book)
  addBook(@Arg("data") { title, author }: BookInput) {
    const lastBook = books.at(-1);
    const lastId = lastBook ? parseInt(lastBook.id, 10) : 0;
    const id = (lastId + 1).toString();
    books.push({ title, author, id });
    return books.at(-1);
  }
}


// // The ApolloServer constructor requires two parameters: your schema
// // definition and your set of resolvers.
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });



// // Passing an ApolloServer instance to the `startStandaloneServer` function:
// //  1. creates an Express app
// //  2. installs your ApolloServer instance as middleware
// //  3. prepares your app to handle incoming requests
(async () => {

  const schema = await buildSchema({
    resolvers: [BookResolver],
  });
  
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();









