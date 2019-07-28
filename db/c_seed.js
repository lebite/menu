/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
const faker = require('faker');
const fs = require('fs');

const writeCassandraFile = fs.createWriteStream('cassandra.csv');

const allMenus = ['Early', 'Dinner', 'Breakfast', 'Dinner', 'Seasonal', 'Lunch', 'Brunch', 'Lunch', 'Weekend Brunch', 'Happy Hour', 'Late Night', 'Beverages', 'Kids', 'Bar', 'Dessert', 'Cocktails', 'Gluten-Free', 'Vegetarian', 'Drinks'];
const menuSections = ['Tromp', 'Bode', 'Zboncak', 'Dare', 'Olson', 'Crist', 'Bauch', 'Bode', 'Torp', 'Gulgowski', 'Leuschke', 
  'Bergnaum', 'Moen', 'Simonis', 'Kihn', 'Jast', 'Bahringer', 'Oberbrunner', 'Rolfson', 'Kunde', 'Walker', 'Maggio', 'Schowalter', 'Grimes',
  'Dare', 'Will', 'Kessler', 'Kemmer', 'Denesik', 'Jast'];


const makeCassandraData = () => {
  const result = [];
  for (let i = 1; i < 10000000; i++) {
    const menus = [allMenus[faker.random.number({ min: 0, max: 3 })], allMenus[faker.random.number({ min: 4, max: 7 })], allMenus[faker.random.number({ min: 7, max: allMenus.length - 1 })]];
    for (const menu of menus) {
      const sections = [menuSections[faker.random.number({ min: 0, max: 10 })], menuSections[faker.random.number({ min: 11, max: 20 })],
        menuSections[faker.random.number({ min: 21, max: 29 })]]; 
      for (let j = 0; j < faker.random.number({ min: 2, max: 3 }); j++) {
        const section = sections[j];
        for (let k = 0; k < faker.random.number({ min: 4, max: 5 }); k++) {
          const item = `${i}, ${menu}, ${section}, ${faker.commerce.productName()}, ${faker.lorem.words()}, ${faker.commerce.price(5, 50, 2)}`;
          result.push(item);
        }
      }
    }
  }
  return result;
};

const cassandraData = makeCassandraData();

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


// writeIntoFile(writeCassandraFile, cassandraData, 'utf8', () => console.log('write complete'));




// COPY bite_menus (restaurant_id, menu, section, item, description, price) from '/Users/TinaLe/Le_Bite/menu/db/cassandra.csv'