/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
const faker = require('faker');
const fs = require('fs');

const writeCassandraFile = fs.createWriteStream('cassandra.csv');

let menus = ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Beverages', 'Kids', 'Late Night', 'Happy Hour', 'Bar', 'Dessert', 'Cocktails', 'Gluten-Free', 'Vegetarian'];


const makeCassandraData = () => {
  const result = [];
  menus = [menus[faker.random.number({ min: 0, max: 3 })], menus[faker.random.number({ min: 4, max: 6 })]];
  for (let i = 1; i < faker.random.number({ min: 3, max: 4 }); i++) {
    for (const menu of menus) {
      for (let j = 0; j < faker.random.number({ min: 2, max: 3 }); j++) {
        const section = faker.name.lastName();
        for (let k = 0; k < faker.random.number({ min: 4, max: 5 }); k++) {
          const item = `${i}, ${menu}, ${section}, ${faker.commerce.productName()}, ${faker.lorem.words()}, ${faker.commerce.price(10, 70, 2)}`;
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
          if (i % 10000 === 0) {
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


writeIntoFile(writeCassandraFile, cassandraData, 'utf8', () => console.log('write complete'));


// COPY bite_menus (restaurant_id, menu, section, item, description, price) from '/Users/TinaLe/Le_Bite/menu/db/cassandra.csv'