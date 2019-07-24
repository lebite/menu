#  Menu CRUD API

MENU API SPECS

`GET /:restaurant_id/restaurant_menus/`

**Input**: `restaurant_id` identifies which restaurant to get menus

**Output**: 

<_If `restaurant_id` is found in database, return_>

CODE: 200
CONTENT: JSON of current restaurant menu(s) data

```
{
  “restaurant_id”: <number>,
  "website": <string>,
  “menus”: [{
    “menu_name”: <string>,
    “menu_description”: <string>,
    “sections”: [{
      “section_name”: <string>,
      “section_description”: <string>,
      “items”: [{
        “item_name”: <string>,
        “item_description”: <string>,
        “item_price”: <number>,
        “item_option”: <string>
        }, … ] 
    }, … ]
  }, … ]
}
```

<_If `restaurant_id` is not found in database, return_>
CODE: 404
MESSAGE: Restaurant not found

`POST /restaurant_menus/add`

**Input**: JSON new restaurant menu data

```
{
  “restaurant_id”: <number>,
  "website": <string>,
  “menus”: [{
    “menu_name”: <string>,
    “menu_description”: <string>,
    “sections”: [{
      “section_name”: <string>,
      “section_description”: <string>,
      “items”: [{
        “item_name”: <string>,
        “item_description”: <string>,
        “item_price”: <number>,
        “item_option”: <string>
        }, … ] 
    }, … ]
  }, … ]
}
```

**Output**: 

<_If post is successful, return_>

Code: 201 
Message: OK

<_If post is not successful, return_>

Code: 400
Message: BAD REQUEST 

`DELETE /:restaurant_id/restaurant_menus/`

**Input**: `restaurant_id` identifies which restaurant to delete menu

**Output**: 

<_If delete is successful, return_>

Code: 200 
Message: OK

<_If post is not successful, return_>

Code: 404
Message: NOT FOUND  

`PUT /:restaurant_id/restaurant_menus/`

**Input**: `restaurant_id` and JSON restaurant new menu data

```
{
  “restaurant_id”: <number>,
  "website": <string>,
  “menus”: [{
    “menu_name”: <string>,
    “menu_description”: <string>,
    “sections”: [{
      “section_name”: <string>,
      “section_description”: <string>,
      “items”: [{
        “item_name”: <string>,
        “item_description”: <string>,
        “item_price”: <number>,
        “item_option”: <string>
        }, … ] 
    }, … ]
  }, … ]
}
```

<_If put is successful, return_>

Code: 200

<_If post is not successful, return_>
 
Code: 400
