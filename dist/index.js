import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
var root = {
    hello() {
        return "Hello world!";
    },
};
var app = express();
app.all("/graphql", createHandler({
    schema: schema,
    rootValue: root,
}));
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
//# sourceMappingURL=index.js.map