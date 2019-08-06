/* eslint-disable no-restricted-syntax */
const db = require('./db/index.js');
const parse = require('./db/model.js');

db.client.connect((err) => {
  if (err) {
    return console.log(err);
  }
  console.log('db connected');
});

db.client2.on('error', (err) => {
  console.log("Error " + err)
});

let count = 1;

module.exports.getMenus = (req, res) => { 
  return db.client2.get(req.params.restaurant_id, (err, result) => {
    if (result) {
      res.send(result);
      return;
    }
    const query = `SELECT * FROM bite_menus WHERE restaurant_id = ?`;
    const params = [`${req.params.restaurant_id}`];
    return db.client.execute(query, params, { prepare: true })
      .then(result => {
        let menuObj = parse.parseMenus(result, params[0])
        db.client2.set(req.params.restaurant_id, JSON.stringify(menuObj));
        res.send(menuObj)
      })
      .catch(err => res.status(500).send(err));
  });
};

// module.exports.getMenus = (req, res) => { 
//   const query = `SELECT * FROM bite_menus WHERE restaurant_id = ?`;
//   const params = [`${req.params.restaurant_id}`];
//   db.client.execute(query, params, { prepare: true })
//     .then(result => res.send(parse.parseMenus(result, params[0])))
//     .catch(err => res.Status(500).send(err));
// };

// module.exports.getMenus = (req, res) => {
//   const query = `SELECT menu FROM bite_menus WHERE restaurant_id = ?`;
//   const params = [`${req.params.restaurant_id}`];
//   db.client.execute(query, params, { prepare: true })
//     .then(result => res.send(result))
//     .catch(err => res.Status(500).send(err));
// };

module.exports.addItem = (req, res) => {
  const query = ` INSERT INTO bite_menus (restaurant_id, menu, section, item, description, price) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [req.params.restaurant_id, req.body.menu, req.body.section, req.body.item, req.body.description, req.body.price];
  db.client.execute(query, params, { prepare: true })
    .then(() => res.sendStatus(201))
    .catch(err => res.status(500).send(err));
};

module.exports.deleteItem = (req, res) => {
  const query = 'DELETE FROM bite_menus WHERE restaurant_id = ? and menu = ? and section = ? AND item = ?';
  console.log(req.body);
  const params = [req.params.restaurant_id, req.body.menu, req.body.section, req.body.item];
  console.log('params: ', params);
  db.execute(query, params, { prepare: true })
  .then(() => res.sendStatus(200))
  .catch(err => res.status(500).send(err));
};

// Example Params 
// const params = [1001, 'Dinner', 'Example Section', 'Cereal']
// const params = [1001, 'Dinner', 'Example Section', 'Cereal', 'Fun delicious cereal', 20.00];