
// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const axios = require('axios');

// Configuring environment variables
dotenv.config();

// Creating Express app
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
// Only enable livereload during development
if (process.env.NODE_ENV === 'development') {

  // Importing required modules
  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");
  const morgan = require('morgan');
  //Morgan code
  app.use(morgan('dev'));

  // Livereload code
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(["public", "views"]);
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  app.use(connectLiveReload());
}

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
