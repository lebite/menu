use bite_menu;

DROP  table if exists bite_menus; 

CREATE TABLE bite_menus (
    restaurant_id int,
    menu text,
    section text,
    item text,
    description text,
    price decimal,
    PRIMARY KEY(restaurant_id, menu, section, item)
); 

-- CREATE TABLE bite_menus (
--     restaurant_id int,
--     menu text,
--     section text, 
--     item <text, text>,
--     PRIMARY KEY(restaurant_id, menu, section)
-- ); 

