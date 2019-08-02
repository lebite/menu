const faker = require('faker');
const db = require('./index.js');
const Restaurant = require('./Restaurant.js');

const restaurantsArray = [];

const randomMenuData = [
  'Breakfast Menu', 'Brunch Menu', 'Lunch Menu', 'Dinner Menu',
  'Dessert', 'Bar Menu', 'Kid\'s Menu', 'Vegetarian Menu',
  'Organic Menu', 'Seasonal Menu', 'Cocktails', 'Drinks',
  'Kosher Menu', 'Halal Menu', 'Secret Menu', 'Party Menu',
  'Leftovers', 'Tapas', 'Delivery Menu', 'Happy Hour', 'Pies',
  'Chipotle', 'Banana Milk', 'Overcooked', 'Pão de Queijo',
  'Late Night Menu', 'Exotic Menu', 'Bizarre Menu', 'Snacks',
  'Senior Menu', 'Microwaved', 'Healthy Menu', 'Wine List',
  'Chef\'s Specials', 'Dog Menu', 'Catering Menu', 'Grilled',
];

function shuffle(a) {
  const shuffledArray = a;
  let j;
  let x;
  let i;
  for (i = shuffledArray.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    x = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = x;
  }
  return shuffledArray;
}


for (let i = 0; i < 100; i += 1) {
  const menusArray = [];
  const menuCount = faker.random.number({ min: 1, max: 6 });
  let randomMenuDataShuffled = [];
  if (menuCount > 0) {
    randomMenuDataShuffled = shuffle(randomMenuData);
  }
  for (let j = 0; j < menuCount; j += 1) {
    const sectionsArray = [];
    const sectionCount = faker.random.number({ min: 1, max: 8 });
    for (let k = 0; k < sectionCount; k += 1) {
      const itemsArray = [];
      const itemCount = faker.random.number({ min: 1, max: 16 });
      for (let l = 0; l < itemCount; l += 1) {
        itemsArray.push({
          item_name: faker.commerce.productName(),
          item_description: faker.lorem.sentences(1, 8),
          item_price: faker.commerce.price(1, 50.00, 2, '$'),
          item_option: faker.lorem.words(1),
        });
      }
      sectionsArray.push(
        {
          section_name: faker.name.lastName(),
          section_description: faker.lorem.sentence(3),
          items: itemsArray,
        },
      );
    }
    menusArray.push(
      {
        menu_name: randomMenuDataShuffled[j],
        menu_description: faker.lorem.sentence(3),
        sections: sectionsArray,
      },
    );
  }
  restaurantsArray.push({
    restaurant_id: i,
    website: faker.internet.url(),
    menus: menusArray,
  });
}

function seedRestaurantMenus() {
  Restaurant.insertMany(restaurantsArray)
    .then((docs) => {
      console.log(`Successfully added ${docs.length} restaurants to database.`);
      db.close();
    })
    .catch((err) => {
      console.log(`Failed to add restaurants to database: ${err}`);
      db.close();
    });
}

seedRestaurantMenus();
