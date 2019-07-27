const faker = require('faker');
const fs = require('fs');


const writeFile = fs.createWriteStream('menus.csv');

function writeItems(writer, encoding, callback) {
  let data;
  let i;
  function write() {
    let ok = true;
    do {
      for (i = 10; i > 0; i--) {
        data = `${faker.commerce.productName()}, ${faker.lorem.words()}, ${faker.commerce.price(10, 70, 2)}, ${faker.random.number({ min: 1, max: 90000000 })} \n`;
        if (i === 0) {
        // Last time!
          writer.write(data, encoding, callback);
        } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
          ok = writer.write(data, encoding);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
    // Had to stop early!
    // Write some more once it drains.
      writer.once('drain', write);
    }
  }
  write();
}


writeItems(writeFile, 'utf8', () => {});

// \copy items (item_name, item_description, price, restaurant_menu_section_id) FROM '/Users/TinaLe/Le_Bite/menu/db/menus.csv' WITH (FORMAT csv);
