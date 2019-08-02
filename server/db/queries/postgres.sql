-- POSTGRESQL QUERY TEMPLATES

-- GET ALL MENUS FROM RESTAURANT ID

SELECT menus.menu_name
  FROM menus 
  INNER JOIN restaurant_menus ON menus.id = restaurant_menus.menus_id
  WHERE restaurant_menus.restaurant_id = INPUT 

-- GET ALL MENUS AND SECTIONS FROM RESTAURANT ID

SELECT m.menu_name, s.section_name
  FROM menus m
  INNER JOIN restaurant_menus rm ON m.id = rm.menus_id
  INNER JOIN restaurant_menu_section rms ON rm.id = rms.restaurant_menus_id
  INNER JOIN sections s ON rms.section_id = s.id
  WHERE rm.restaurant_id = INPUT; 

-- GET ALL MENUS AND SECTIONS AND ITEM FROM RESTAURANT ID

SELECT m.menu_name, s.section_name, i.item_name, i.item_description, i.price
  FROM menus m
  INNER JOIN restaurant_menus rm ON m.id = rm.menus_id
  INNER JOIN restaurant_menu_section rms ON rm.id = rms.restaurant_menus_id
  INNER JOIN sections s ON rms.section_id = s.id
  INNER JOIN items i ON rms.id = i.restaurant_menu_section_id
  WHERE rm.restaurant_id = 9995555 and m.menu_name = Brunch; 

-- DELETE MENU

DELETE rm.*, rms.*, i.*
  FROM menus m
  INNER JOIN restaurant_menus rm ON m.id = rm.menus_id
  INNER JOIN restaurant_menu_section rms ON rm.id = rms.restaurant_menus_id
  INNER JOIN items i ON rms.id = i.restaurant_menu_section_id
  WHERE rm.restaurant_id = INPUT and m.menu_name = INPUT; 

-- DELETE SECTION 

DELETE rms.*, i.*
  FROM menus m
  INNER JOIN restaurant_menus rm ON m.id = rm.menus_id
  INNER JOIN restaurant_menu_section rms ON rm.id = rms.restaurant_menus_id
  INNER JOIN sections s ON rms.section_id = s.id
  INNER JOIN items i ON rms.id = i.restaurant_menu_section_id
  WHERE rm.restaurant_id = INPUT and m.menu_name = INPUT and s.section_name = INPUT; 

--DELETE ITEM 

DELETE i.*
  FROM menus m
  INNER JOIN restaurant_menus rm ON m.id = rm.menus_id
  INNER JOIN restaurant_menu_section rms ON rm.id = rms.restaurant_menus_id
  INNER JOIN sections s ON rms.section_id = s.id
  INNER JOIN items i ON rms.id = i.restaurant_menu_section_id
  WHERE rm.restaurant_id = INPUT and m.menu_name = INPUT and s.section_name = INPUT and i.item_name = INPUT;

--UPDATE PRICE

UPDATE i 
  SET price = INPUT
  FROM menus m
  INNER JOIN restaurant_menus rm ON m.id = rm.menus_id
  INNER JOIN restaurant_menu_section rms ON rm.id = rms.restaurant_menus_id
  INNER JOIN sections s ON rms.section_id = s.id
  INNER JOIN items i ON rms.id = i.restaurant_menu_section_id
  WHERE rm.restaurant_id = INPUT and m.menu_name = INPUT and s.section_name = INPUT and i.item_name = INPUT;

--INSERT NEW ITEM 

 INSERT INTO items (item_name, item_description, price, restaurant_menu_section_id) (
    SELECT INPUT item_name, INPUT item_description, INPUT price, rms.restaurant_menu_section_id 
    FROM menus m
    INNER JOIN restaurant_menus rm ON m.id = rm.menus_id
    INNER JOIN restaurant_menu_section rms ON rm.id = rms.restaurant_menus_id
    INNER JOIN sections s ON rms.section_id = s.id 
    WHERE rm.restaurant_id = 141 and m.menu_name =  and s.section_name = INPUT; 
)

 INSERT INTO items (item_name, item_description, price, restaurant_menu_section_id) (
    SELECT 'cheese', 'delicious', 15.00, items.restaurant_menu_section_id 
    FROM menus m
    INNER JOIN restaurant_menus rm ON m.id = rm.menus_id
    INNER JOIN restaurant_menu_section rms ON rm.id = rms.restaurant_menus_id
    INNER JOIN sections s ON rms.section_id = s.id 
    INNER JOIN items i ON rms.id = i.restaurant_menu_section_id
    WHERE rm.restaurant_id = 9995555 and m.menu_name = 'Early'  and s.section_name = 'Jast'
);





