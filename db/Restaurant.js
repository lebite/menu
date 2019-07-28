const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/reservly';
mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const restaurantSchema = new mongoose.Schema({
  restaurant_id: Number,
  menus: [{
    menu_name: String,
    sections: [{
      section_name: String,
      items: [{
        item_name: String,
        item_description: String,
        item_price: String,
      }],
    }],
  }],
});


const Restaurant = mongoose.model('Menu', restaurantSchema);

module.exports = Restaurant;
