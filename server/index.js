const newrelic = require('newrelic')
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');
const Restaurant = require('./db/Restaurant.js');
const controller = require('./controller.js');
const bodyParser = require('body-parser');
const redis = require('redis');


const client2 = redis.createClient();

client2.on('error', (err) => {
  console.log("Error " + err);
});


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