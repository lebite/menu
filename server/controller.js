/* eslint-disable no-restricted-syntax */
const db = require('./db/index.js');


db.client.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('db connected');
});

db.client2.on('error', (err) => {
  console.log("Error " + err);
});

const parseMenus = (data, id) => {
  const menuNames = Array.from(new Set(data.rows.map(row => row.menu)));
  const result = {
    restaurant_id: id,
    menus: [],
  };
  for (const menu of menuNames) {
    const sectionNames = Array.from(new Set(data.rows.filter(row => row.menu === menu).map(row => row.section)));
    const sectionInfo = [];
    const itemInfo = []; 
    for (const s of sectionNames) {
      const items = data.rows.filter(row => row.section === s).filter(row => row.section === s).map(row => row.item);
      for (const i of items) {
        itemInfo.push({
          item_name: i,
          item_description: data.rows.filter(row => row.item === i).map(row => row.description)[0],
          item_price: String(data.rows.filter(row => row.item === i).map(row => row.price)[0]).split(':')[0]
        });
      }
      sectionInfo.push({ section_name: s, items: itemInfo });
    }
    result.menus.push({
      menu_name: menu,
      sections: sectionInfo,
    });
  }
  return result;
};

module.exports.getMenus = (req, res) => { 
  return db.client2.get(req.params.restaurant_id, (err, result) => {
    if (result) {
      console.log('cached');
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    }
    const query = `SELECT * FROM bite_menus WHERE restaurant_id = ?`;
    const params = [`${req.params.restaurant_id}`];
    return db.client.execute(query, params, { prepare: true })
      .then(result => {
        db.client2.setex(req.params.restaurant_id, 3600, JSON.stringify(parseMenus(result, params[0])));
        res.send(parseMenus(result, params[0]))
      })
      .catch(err => res.Status(500).send(err));
  });
};

// module.exports.getMenus = (req, res) => { 
//   const query = `SELECT * FROM bite_menus WHERE restaurant_id = ?`;
//   const params = [`${req.params.restaurant_id}`];

//   db.client.execute(query, params, { prepare: true })
//     .then(result => res.send(parseMenus(result, params[0])))
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