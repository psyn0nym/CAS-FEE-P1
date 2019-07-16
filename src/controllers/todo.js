const TodoModel = require('../models/todo');

class TodoController {
  static get(req, res) {
    try {
      TodoModel.get(req).then(data => {
        res.send(data);
      });
    } catch(exception) {
      res.status(500).send(exception)
    }
  }

  static async post(req, res) {
    try {
      let payload = await TodoModel.put(req);
      res.send(payload);
    } catch(exception) {
      res.status(500).send(exception)
    }
  }


  static getAll(req, res) {
    try {
      TodoModel.getAll(req).then(data => {
        res.send(data);
      });
    } catch(exception) {
      res.status(500).send(exception)
    }
  }

  static async update(req, res) {
    try {
      let payload = await TodoModel.put(req);
      res.send(payload);
    } catch(exception) {
      res.status(500).send(exception)
    }
  }

  // static async update(req, res) {
  //   try {
  //     let payload = await TodoModel.delete(req);
  //     res.send(payload);
  //   } catch(exception) {
  //     res.status(500).send(exception)
  //   }
  // }

}

module.exports = TodoController;