# Profile

This DTO represents a profile on the server. It has the following values

- **cuid**: _String_ (_Mandatory_) Unique identifier. This is the same value than cuid [User](./user.md)
- **name**: _String_ User's name
- **location**: _[Location](./location.md)_ User's location
- **contact**: _[Contact](./contact.md)_ User's contact
- **instruments**: _[String]_ User's skills
- **videos**: _[[VideoDTO](./video.md)]_ User's examples
- **description**: _String_ User's description
- **photo**: _String_ User's relative path to its avatar
- **friendlyLocation**: _String_ User's friendly location
- **followers**: _[String]_ (_Mandatory_) User ids who have accepted your invites
- **invitations**: _[String]_ (_Mandatory_) User ids who have been invited but not accepted

## Example

```javascript
{
    "cuid": "ck2g2765h0000q64g4y8tfk0a",
    "name": "Test user 123",
    "location": {
        "lat": 40.34,
        "long": 0.5
    },
    "contact": {
        "type": "email",
        "data": "test_user@gmail.com"
    },
    "instruments": [
        "bateria"
    ],
    "friendlyLocation": "Vienna",
    "videos": [
        "https://www.youtube.com/watch?v=41DH065Lfeo&list=RD41DH065Lfeo&start_radio=1"
    ],
    "description": "Lorem ipsum dolor ...",
    "photo": "/Users/albertogarcia-munoz/Documents/Repositories/ProyectoFinal/PiedPipers/public/img/ck2g2765h0000q64g4y8tfk0a.png",
    "followers": ["asdjakdjnakdn998123a"],
    "invitations": ["ck2g2765h0000q6ahsdbjasd8tfk0a"]
}
```
