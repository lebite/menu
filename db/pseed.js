/* eslint-disable no-plusplus */
const faker = require('faker');
const fs = require('fs');

const writeRestaurantsFile = fs.createWriteStream('restaurants.csv');
const writeRestaurantsFile = fs.createWriteStream('restaurants.csv', {flags: 'a'});
const writeMenusFile = fs.createWriteStream('menus.csv');
const writeSectionsFile = fs.createWriteStream('sections.csv');
const writeItemsFile = fs.createWriteStream('items.csv');

const makeSectionNames = () => {
  const sections = [];
  for (let i = 0; i < 30; i++) {
    sections.push(faker.name.lastName());
  }
  return sections;
};

const makeRestaurants = () => {
  const id = [];
  for (let i = 10000000; i > 5000000; i--) {
    id.push(i);
  }
  return id;
};

const menus = ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Beverages', 'Kids', 'Late Night', 'Happy Hour', 'Bar', 'Dessert', 'Cocktails', 'Gluten-Free', 'Vegetarian'];
const sections = makeSectionNames();
const restaurants = makeRestaurants();

function writeIntoFile(writer, data, encoding, callback) {
  let i;
  function write() {
    let ok = true;
    do {
      for (i = data.length - 1; i >= 0; i--) {
        if (i === 0) {
          writer.write(`${data[i]}\n`, encoding, callback);
        } else {
          if (i % 100000 === 0) {
            console.log(i);
          }
          ok = writer.write(`${data[i]}\n`, encoding);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}


function writeItemsIntoFile(writer, encoding, callback) {
  let data;
  let i;
  function write() {
    let ok = true;
    do {
      for (i = 10; i > 0; i--) {
        data = `${faker.commerce.productName()}, ${faker.lorem.words()}, ${faker.commerce.price(10, 70, 2)}, ${faker.random.number({ min: 1, max: 90000000 })} \n`;
        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
          ok = writer.write(data, encoding);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeIntoFile(writeRestaurantsFile, restaurants, 'utf8', () => console.log('writeRestaurantsFile complete'));
writeIntoFile(writeMenusFile, menus, 'utf8', () => console.log('writeMenusFiles complete'));
writeIntoFile(writeSectionsFile, sections, 'utf8', () => console.log('writeSectionFiles complete'));
writeItemsIntoFile(writeItemsFile, 'utf8', () => {});

// \copy menus (menu_name) FROM '/Users/TinaLe/Le_Bite/menu/db/menus.csv' WITH (FORMAT csv);
// \copy items (item_name, item_description, price, restaurant_menu_section_id) FROM '/Users/TinaLe/Le_Bite/menu/db/menus.csv' WITH (FORMAT csv);

