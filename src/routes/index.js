const exphbs = require('express-handlebars');
const path = require("path");
const TodoApiRoutes = require("./api");
const express = require('express');

module.exports = function (app) {

  // Register Handlebars view engine
  app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
  // Use Handlebars view engine
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, '../views/'));
  app.use('/api', TodoApiRoutes);
  app.use(express.static(path.join(__dirname, '../../public')));
  app.get('/', (req, res) => {
    res.render('home');
  });

}