
// src/controller/graphqlController.js

const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');

const userService = require("../controllers/user-controller.js");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    user(username: String!): User     
    
  }
  type Mutation {
      createUser(username: String!, email: String!, password: String!): User,
      deleteBook(id: Int!): DeleteBookResponse,
      login(username: String!, email: String!, password: String!): User,
      saveBook(title: String!, link: String, image: String, bookId: String!, description: String!): Book
  }
  input UserInput {
      username: String,
      email: String,
      _id: String,
  }
  type DeleteBookResponse {
    id: Int!
  }
  type User {
    username: String!,
    email: String!,
    password: String!
  }
type Book{
    title: String!,
    link: String,
    image: String,
    bookId: String!,
    description: String!,
}

`);


const rootResolver = {
    user: graphqlInput => userService.getSingleUser(graphqlInput && graphqlInput.id),
    
    createUser: graphqlInput => userService.createUser(graphqlInput),
    deleteBook: graphqlInput => userService.deleteBook(graphqlInput.id),
    login: graphqlInput => userService.login(graphqlInput && graphqlInput.id),
    saveBook: graphqlInput => userService.saveBook(graphqlInput),
  };
  
  const graphql = graphqlHTTP({
    schema,
    rootValue: rootResolver,
    graphiql: true, // this creates the interactive GraphQL API explorer with documentation.
  });
  
  module.exports = graphql;
