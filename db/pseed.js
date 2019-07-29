/* eslint-disable no-plusplus */
const faker = require('faker');
const fs = require('fs');

// const writeRestaurantsFile = fs.createWriteStream('restaurants.csv');
// const writeRestaurantsFile = fs.createWriteStream('restaurants.csv', {flags: 'a'});
const writeRestMenuFile = fs.createWriteStream('rest_menu.csv');
const writeRestMenuSectFile = fs.createWriteStream('rest_menu_sect.csv');
const writeMenusFile = fs.createWriteStream('menus.csv');
const writeSectionsFile = fs.createWriteStream('sections.csv');
const writeItemsFile = fs.createWriteStream('items.csv');

const menuSections = ['Tromp', 'Bode', 'Zboncak', 'Dare', 'Olson', 'Crist', 'Bauch', 'Bode', 'Torp', 'Gulgowski', 'Leuschke', 
'Bergnaum', 'Moen', 'Simonis', 'Kihn', 'Jast', 'Bahringer', 'Oberbrunner', 'Rolfson', 'Kunde', 'Walker', 'Maggio', 'Schowalter', 'Grimes',
'Dare', 'Will', 'Kessler', 'Kemmer', 'Denesik', 'Jast'];

const allMenus = ['Early', 'Dinner', 'Breakfast', 'Dinner', 'Seasonal', 'Lunch', 'Brunch', 'Lunch', 'Weekend Brunch', 'Happy Hour', 'Late Night', 'Beverages', 'Kids', 'Bar', 'Dessert', 'Cocktails', 'Gluten-Free', 'Vegetarian', 'Drinks'];


function writeIntoFile(writer, data, encoding, callback) {
  const i = data.length;
  function write() {
    let ok = true;
    do {
      if (i === 0) {
        writer.write(`${data[i]}\n`, encoding, callback);
      } else {
        ok = writer.write(`${data[i]}\n`, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

let menuCount = 0;
let sectionCount = 0;

function writeToRestMenuFile(writer, encoding, callback) {
  let i = 11;
  let data;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      const menuIdx = [faker.random.number({ min: 1, max: 4 }), faker.random.number({ min: 5, max: 8 }), faker.random.number({ min: 9, max: allMenus.length - 1 })];
      for (let j = 0; j < faker.random.number({ min: 2, max: 3 }); j++) {
        data = `${i}, ${menuIdx[j]} \n`;
        menuCount += 1;
        if (i === 1) {
          writer.write(data, encoding);
        } else {
          ok = writer.write(data, encoding);
        }
      }
    } while (i > 1 && ok);
    if (i > 1) {
      writer.once('drain', write);
    }
  }
  callback();
}

function writeToRestMenuSectFile(writer, encoding, callback) {
  let i = menuCount + 1;
  let data;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      const sectionIdx = [faker.random.number({ min: 1, max: 10 }), faker.random.number({ min: 11, max: 20 }), faker.random.number({ min: 21, max: 29 })];
      for (let j = 0; j < faker.random.number({ min: 2, max: 3 }); j++) {
        data = `${i}, ${sectionIdx[j]} \n`;
        sectionCount += 1;
        if (i === 1) {
          writer.write(data, encoding);
        } else {
          ok = writer.write(data, encoding);
        }
      }
    } while (i > 1 && ok);
    if (i > 1) {
      writer.once('drain', write);
    }
  }
  callback();
}


function writeItemsIntoFile(writer, encoding, callback) {
  let i = sectionCount + 1;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      for (let k = 0; k < faker.random.number({ min: 4, max: 5 }); k++) {
        const item = `${faker.commerce.productName()}, ${faker.lorem.words()}, ${faker.commerce.price(5, 50, 2)}, ${i}`;
        if (i === 1) {
          writer.write(`${item}\n`, encoding);
        } else {
          ok = writer.write(`${item}\n`, encoding);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  callback(); 
}

// writeIntoFile(writeRestaurantsFile, restaurants, 'utf8', () => console.log('writeRestaurantsFile complete'));

writeIntoFile(writeMenusFile, allMenus, 'utf8', () => console.log('writeMenusFiles complete'));
writeIntoFile(writeSectionsFile, menuSections, 'utf8', () => console.log('writeSectionFiles complete'));
writeToRestMenuFile(writeRestMenuFile, 'utf8', () => {
  console.log('RestMenu complete');
  writeToRestMenuSectFile(writeRestMenuSectFile, 'utf8', () => {
    console.log('RestMenuSect complete');
    writeItemsIntoFile(writeItemsFile, 'utf8', () => console.log('done'));
  });
});
  

// \copy menus (menu_name) FROM '/Users/TinaLe/Le_Bite/menu/db/menus.csv' WITH (FORMAT csv);
// \copy items (item_name, item_description, price, restaurant_menu_section_id) FROM '/Users/TinaLe/Le_Bite/menu/db/menus.csv' WITH (FORMAT csv);

