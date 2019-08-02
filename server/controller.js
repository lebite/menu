/* eslint-disable no-restricted-syntax */
const db = require('./db/index.js');


db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('db connected');
});

const parseMenus = (data, id) => {
  const menuNames = Array.from(new Set(data.rows.map(row => row.menu)));
  const result = {
    restaurant_id: id,
    menus: []
  };
  for (const menu of menuNames) {
    const sectionNames = Array.from(new Set(data.rows.filter(row => row.menu === menu).map(row => row.section)));
    const sectionInfo = [];
    const itemInfo = []; 
    for (let s of sectionNames) {
      const items = data.rows.filter(row => row.section === s).filter(row => row.section === s).map(row => row.item);
      for (let i of items) {
        itemInfo.push({
          item_name: i,
          item_description: data.rows.filter(row => row.item === i).map(row => row.description)[0],
          item_price: String(data.rows.filter(row => row.item === i).map(row => row.price)[0]).split(':')[0]
        });
        console.log(itemInfo);
      }
      console.log('itemInfo', itemInfo);
      sectionInfo.push({section_name: s, items: itemInfo});
    } 
    result.menus.push({
      menu_name: menu,
      sections: sectionInfo,
    });
  }
  return result;
};

module.exports.getMenus = (req, res) => { 
  const query = `SELECT * FROM bite_menus WHERE restaurant_id = ?`;
  const params = [`${req.params.restaurant_id}`];
  db.execute(query, params, { prepare : true })
    .then(result => res.send(parseMenus(result, params[0])))
    .catch(err => console.log(err));
};




// ${req.params.restaurant_id}

// {
//   “restaurant_id”: <number>,
//   “menus”: [{
//     “menu_name”: <string>,
//     “sections”: [{
//       “section_name”: <string>,
//       “items”: [{
//         “item_name”: <string>,
//         “item_description”: <string>,
//         “item_price”: <number>,
//         “item_option”: <string>
//         }, … ] 
//     }, … ]
//   }, … ]
// }