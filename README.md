#  Le Bite Menu API 

Routes and responses for creating, reading, updating and deleting Le Bite's menu feature. 

# GET

`GET /:id/restaurant_menus/`

**INPUT**: 

Takes a query parameteter that is an integer (`:id`) which identifies the restaurant to retrieve menus from. 

**OUTPUT**:

_If `id` is found in database, returns:_ 

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

_If `id` is not found in database, returns:_

**Code:** 404

**Message:** Restaurant not found

# POST

`POST add/restaurant_menus/`

**INPUT**: 

Takes in JSON object for a new restaurant's menu. The data should be formatted as follows: 

```
{
  “restaurant_id”: <number>,
  “menus”: [{
    “menu_name”: <string>,
    “sections”: [{
      “section_name”: <string>,
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

_If post is successful, returns:_

**Code:** 201 

**Message:** OK

_If post is not successful, returns:_

**Code:** 400

**Message:** BAD REQUEST 

# DELETE

`DELETE /:id/restaurant_menus/`

**INPUT:** 

Takes a query parameteter that is an integer (`id`) which identifies the restaurant to delete all menus from. 

**OUTPUT:** 

_If delete is successful, returns:_

**Code:** 200

**Message:** OK

_If post is not successful, returns:_ 

**Code:** 404
**Message:** NOT FOUND  

# PUT

`PUT /:id/restaurant_menus/`

**INPUT:**: 

Takes a query parameteter that is an integer (`restaurant_id`) and JSON object for restaurant's new menus. The data should be formatted as follows:

```
{
  “restaurant_id”: <number>,
  “menus”: [{
    “menu_name”: <string>,
    “sections”: [{
      “section_name”: <string>,
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

_If put is successful, returns:_

**Code:** 200

_If put is not successful, returns:_
 
**Code:** 400


