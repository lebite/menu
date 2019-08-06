// module.exports.parseMenu = (data, id) => {
//   const menuNames = Array.from(new Set(data.rows.map(row => row.menu)));
//   const result = {
//     restaurant_id: id,
//     menus: [],
//   };
//   for (const menu of menuNames) {
//     const sectionNames = Array.from(new Set(data.rows.filter(row => row.menu === menu).map(row => row.section)));
//     const sectionInfo = [];
//     const itemInfo = [];
//     for (const s of sectionNames) {
//       const items = data.rows.filter(row => row.section === s).filter(row => row.section === s).map(row => row.item);
//       for (const i of items) {
//         itemInfo.push({
//           item_name: i,
//           item_description: data.rows.filter(row => row.item === i).map(row => row.description)[0],
//           item_price: String(data.rows.filter(row => row.item === i).map(row => row.price)[0]).split(':')[0],
//         });
//       }
//       sectionInfo.push({ section_name: s, items: itemInfo });
//     }
//     result.menus.push({
//       menu_name: menu,
//       sections: sectionInfo,
//     });
//   }
//   return result;
// };

module.exports.parseMenus = ({ rows }, id = 0) => {
  const result = {
    restaurant_id: id,
    menus: [],
  };
  let menu = {
    menu_name: rows[0].menu,
    sections: [],
  }
  let section = {
    section_name: rows[0].section,
    items: [],
  };
  rows.forEach((val) => {
    if (val.section !== section.section_name) {
      if (section !== null) menu.sections.push(section);
      section = {
        section_name: val.section,
        items: [],
      };
    }
    if (val.menu !== menu.menu_name) {
      if (menu !== null) result.menus.push(menu);
      menu = {
        menu_name: val.menu,
        sections: [],
      };
    }
    section.items.push({
      item_name: val.item,
      item_description: val.description,
      item_price: val.price,
    });
  });
  menu.sections.push(section);
  result.menus.push(menu);
  return result;
};


module.exports.menu = (data) => {
  const menuNames = Array.from(new Set(data.rows.map(row => row.menu)));
  return menuNames;
};