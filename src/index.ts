import { ApolloServer } from '@apollo/server'; // preserve-line
import { startStandaloneServer } from '@apollo/server/standalone'; // preserve-line
// import express from "express";
// import { createHandler } from "graphql-http/lib/use/express";
// import { buildSchema } from "graphql";


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID,
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    id: "0",
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    id: "1",
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

// // The ApolloServer constructor requires two parameters: your schema
// // definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// // Passing an ApolloServer instance to the `startStandaloneServer` function:
// //  1. creates an Express app
// //  2. installs your ApolloServer instance as middleware
// //  3. prepares your app to handle incoming requests
(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();









// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `)
 
// The root provides a resolver function for each API endpoint
// var root = {
//   hello() {
//     return "Hello world!"
//   },
// }
 
//var app = express()
 
// Create and use the GraphQL handler.
// app.all(
//   "/graphql",
//   createHandler({
//     schema: schema,
//     rootValue: root,
//   })
// )
 
// Start the server at port
// app.listen(4000)
// console.log("Running a GraphQL API server at http://localhost:4000/graphql")
