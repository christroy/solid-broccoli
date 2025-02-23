const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const graphqlController = require("./graphql/controller.js");
const dotenv = require("dotenv");

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3001;

app.use("/graphql", graphqlController)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
