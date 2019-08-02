const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');
const Restaurant = require('./db/Restaurant.js');
const controller = require('./controller.js')

const app = express();
const port = 3003;


app.use('/', expressStaticGzip(path.join(__dirname, '/../public/'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
}));

app.use('/:restaurant_id', expressStaticGzip(path.join(__dirname, '/../public/'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
}));

// app.get('/:restaurant_id/menus', (req, res) => (
//   Restaurant.find(req.params, (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     res.send(data);
//   })
// ));

app.get('/:restaurant_id/menus', controller.getMenus);

// app.get('/:restaurant_id/menus', (req, res) => {
//   res.send('oki');
// });

app.listen(port, () => {console.log(`Listening on port ${port}`); });
