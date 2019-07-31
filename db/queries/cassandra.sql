-- CASSANDRA QUERY TEMPLATES

-- ALL MENUS (OR SECTION OR ITEM OR DESCRIPTION OR PRICE) FROM RESTAURANT ID 
SELECT menu
FROM bite_menus
WHERE restaurant_id = INPUT 

-- ALL FROM RESTAURANT ID AND MENU NAME
SELECT * FROM bite_menus 
WHERE restaurant_id = INPUT and menu = INPUT

-- UPDATE ITEM PRICE or DESCRIPTION with RESTAURANT ID MENU SECTION AND ITEM
UPDATE bite_menus
SET price = 50.00
WHERE restaurant_id = 56 AND menu = ' Gluten-Free' AND section = ' Maggio' AND item = ' Gorgeous Fresh Pizza'; 

--DELETE MENU with RESTAURANT ID and MENU
delete from bite_menus where restaurant_id = INPUT and menu = INPUT; 

--DELETE SECTION with RESTAURANT ID and MENU and SECTION
delete from bite_menus where restaurant_id = INPUT and menu = INPUT and section = INPUT; 

--DELETE ITEM with RESTAURANT ID MENU and SECTION 
delete from bite_menus where restaurant_id = 9666777 and menu = ' Breakfast' and section = ' Jast' and item = ' Gorgeous Wooden Chips'; 

--INSERT NEW MENU/SECTION 

BEGIN BATCH
   INSERT INTO bite_menus (restaurant_id, menu, section, item, description, price) 
     VALUES (INPUT #, INPUT menu, INPUT section, INPUT description, INPUT price) 
   INSERT INTO bite_menus (restaurant_id, menu, section, item, description, price) 
     VALUES (INPUT #, INPUT menu, INPUT section, INPUT description, INPUT price) 
   INSERT INTO bite_menus (restaurant_id, menu, section, item, description, price) 
     VALUES (INPUT #, INPUT menu, INPUT section, INPUT description, INPUT price) 
   INSERT INTO bite_menus (restaurant_id, menu, section, item, description, price) 
     VALUES (INPUT #, INPUT menu, INPUT section, INPUT description, INPUT price) 
APPLY BATCH;


--INSERT NEW ITEM 
  INSERT INTO bite_menus (restaurant_id, menu, section, item, description, price) 
     VALUES (INPUT #, INPUT menu, INPUT section, INPUT description, INPUT price) 

-- TURN ON TRACING
TRACING [ON | OFF]