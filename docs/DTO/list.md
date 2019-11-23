# List

This DTO represents a List of Profiles and Locals on the server. It has the following values

- **total**: _Int_ (_Mandatory_) Total items
- **offset**: _Int_ (_Mandatory_) Offset
- **items**: _[Object]_ (Mandatory) found items

## Example for *Profile*

```javascript
{
    "total": 2,
    "offset": 1,
    "items": [
        {
            "cuid": "ck2kpq6490000e24g49j90wuq",
            "name": "Test user 123",
            "location": {
                "lat": 40.34,
                "long": 0.5
            },
            "friendlyLocation": "Vienna",
            "contact": {
                "type": "email",
                "data": "test_user@gmail.com"
            },
            "instruments": [
                "bateria"
            ],
            "videos": [
                { 
                    "id": "idrarodeYT",
                    "video": "https://www.youtube.com/watch?v=41DH065Lfeo&list=RD41DH065Lfeo&start_radio=1",
                    "embedVideo": "",
                    "thumbnail": "thumb.jpg"
                }
            ],
            "description": "Lorem ipsum dolor ..."
        }
    ]
}
```

## Example for *Locals*

```javascript
{
    "total": 2,
    "offset": 1,
    "items": [
        {
            "cuid": "ck2rib3ih0000jl4g67j1c675",
            "dateAdded": "2019-11-09T11:49:44.222Z",
            "name": "Sala mandra!",
            "location": {
                "lat": 40.33,
                "long": 0.5
            },
            "price": 20,
            "contact": {
                "type": "phone",
                "data": "+34671646356"
            },
            "photos": [],
            "description": "Lorem ipsum dolor ..."
        }
    ]
}
```

