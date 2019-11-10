# User

This DTO represents an local inside server. It has the following values

- **cuid**: _String_ (_Mandatory_) Local's unique identifier
- **name**: _String_ (_Mandatory_) Local's name
- **dateAdded**: _String_ (_Mandatory_) Local's register date _yyyy-MM-dd'T'HH:mm:ss.SSS'Z'_
- **location**: _LocationDTO_ (_Mandatory_) Local's location
- **price**: _Number_ (_Mandatory_) Local's price (€ per hour)
- **contact**: _ContactDTO_ (_Mandatory_) Local's contact method
- **photos**: _[String]_ (_Mandatory_) Local's photos
- **description**: _[String]_ (_Mandatory_) Local's description

## Example

```javascript
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
```
