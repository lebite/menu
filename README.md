#  Le Bite Menu API 

Routes and responses for creating, reading, updating and deleting Le Bite's menu feature. 

# GET

`GET /:restaurant_id/restaurant_menus/`

**INPUT**: 

`restaurant_id` identifies which restaurant to get menus

**OUTPUT**:

_If `restaurant_id` is found in database, return:_ 

**Code:** 200

**Content:** JSON of current restaurant menu(s) data:

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

_If `restaurant_id` is not found in database, return:_

**Code:** 404

**Message:** Restaurant not found

# POST

`POST /restaurant_menus/add`

**INPUT**: 

JSON new restaurant menu data

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

**OUTPUT**: 

_If post is successful, return:_

**Code:** 201 

**Message:** OK

_If post is not successful, return:_

**Code:** 400

**Message:** BAD REQUEST 

# DELETE

`DELETE /:restaurant_id/restaurant_menus/`

**INPUT:** 

`restaurant_id` identifies which restaurant to delete menu

**OUTPUT:** 

_If delete is successful, return:_

**Code:** 200

**Message:** OK

_If post is not successful, return:_ 

**Code:** 404
**Message:** NOT FOUND  

# PUT

`PUT /:restaurant_id/restaurant_menus/`

**INPUT:**: `restaurant_id` and JSON restaurant new menu data

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

**OUTPUT:** 

_If put is successful, return:_

**Code:** 200

_If put is not successful, return:_
 
**Code:** 400

