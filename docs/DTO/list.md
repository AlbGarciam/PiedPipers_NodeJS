# List

This DTO represents a contact method on the server. It has the following values

- **total**: _Int_ (_Mandatory_) Total items
- **offset**: _Int_ (_Mandatory_) Offset
- **items**: _[Object]_ (Mandatory) found items

## Example

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
                "https://www.youtube.com/watch?v=41DH065Lfeo&list=RD41DH065Lfeo&start_radio=1"
            ],
            "description": "Lorem ipsum dolor ..."
        }
    ]
}
```
