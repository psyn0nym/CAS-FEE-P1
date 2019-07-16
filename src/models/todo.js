var levelup = require('levelup')
var leveldown = require('leveldown')
var encode = require('encoding-down')
// 1) Create our store

var db = levelup(encode(leveldown('../../todo.db'), { valueEncoding: 'json' }))

class TodoStore {
    static async get(req) {
        return new Promise((resolve, reject) => {
        let doc = db.get("todo:" + req.params.id);
            resolve(doc)
        })
    }
    static async getAll(req) {
        return new Promise((resolve, reject) => {
            var keys = db.createKeyStream({gte: 'todo:!', lte: 'todo:~'})
            var batch = []
            var docs = []
            keys.on('data', function(key) {
              batch.push(key)
            })
            keys.on('end', function() {
              //db.batch(batch)
              batch.forEach(key => {
                  db.get(key, function(err, data) {
                      docs.push(data)
                      if (batch.length === docs.length) {
                          resolve(docs)
                      }
                  })
              })
            })
        })
    }

    static async put(req) {
        const newdoc = req.body;
        const err = await db.put("todo:" + newdoc.id, newdoc);
        if (err) return new Error(err);
        let doc = await db.get("todo:" + newdoc.id);
        return doc;
    }
}


module.exports = TodoStore;
