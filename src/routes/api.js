const express = require('express');
const TodoCtrl = require('../controllers/todo.js');
const api = express.Router();

api
  .get('/todo', TodoCtrl.getAll)
  .get('/todo/:id', TodoCtrl.get)
  .put('/todo', TodoCtrl.post)
  .post('/todo/:id', TodoCtrl.update)
  // .delete('/account/:_id', TodoCtrl.delete)

module.exports = api;
