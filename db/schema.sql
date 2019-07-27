\c le_bite_menu 

DROP TABLE if exists restaurant; 

CREATE TABLE restaurant(
    ID serial,
    PRIMARY KEY(ID)
);

DROP TABLE if exists menus; 

CREATE TABLE menus(
    ID smallserial,
    menu_name varchar(255),  
    PRIMARY KEY(ID)
);

DROP TABLE if exists restaurant_menus; 

CREATE TABLE restaurant_menus(
    ID serial, 
    restaurant_id integer, 
    menus_id integer,
    PRIMARY KEY(ID)
);

DROP TABLE if exists sections; 

CREATE TABLE sections(
    ID smallserial, 
    section_name varchar(255)
);

DROP TABLE if exists restaurant_menu_section; 

CREATE TABLE restaurant_menu_section(
    ID serial, 
    restaurant_menus_id integer, 
    section_id integer 
); 

DROP TABLE if exists items; 

CREATE TABLE items(
    ID SERIAL PRIMARY KEY, 
    item_name varchar(255),
    item_description varchar(255), 
    price money, 
    restaurant_menu_section_id integer
);



