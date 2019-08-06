const newrelic = require('newrelic');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');
const controller = require('./controller.js');
const bodyParser = require('body-parser');
const db = require('./db/index.js');




const app = express();
const port = 3003;

app.use(bodyParser.json());

app.use('/', expressStaticGzip(path.join(__dirname, '/../public/'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
}));

app.use('/:restaurant_id', expressStaticGzip(path.join(__dirname, '/../public/'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
}));


app.get('/:restaurant_id/menus', controller.getMenus);

// app.get('/:restaurant_id/menus', (req, res) => { 
//   return db.client2.get(req.params.restaurant_id, (err, result) => {
//     if (result) {
//       res.send(result);
//       return;
//     }
//     const query = `SELECT * FROM bite_menus WHERE restaurant_id = ?`;
//     const params = [`${req.params.restaurant_id}`];
//     // eslint-disable-next-line consistent-return
//     return db.client.execute(query, params, { prepare: true })
//       // eslint-disable-next-line no-shadow
//       .then(result => {
//         let menuObj = parse.parseMenus(result, params[0])
//         db.client2.setex(req.params.restaurant_id, 3600, JSON.stringify(menuObj));
//         res.send(menuObj)
//       })
//       .catch(err => res.status(500).send(err));
//   });
// });


app.post('/:restaurant_id/menus', controller.addItem);

app.delete('/:restaurant_id/menus', controller.deleteItem);

app.listen(port, () => {console.log(`Listening on port ${port}`)});


// app.get('/:restaurant_id/menus', (req, res) => (
//   Restaurant.find(req.params, (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     res.send(data);
//   })
// ));

// app.get('/:restaurant_id/menus', (req, res) => {
//   res.send('oki');
// });