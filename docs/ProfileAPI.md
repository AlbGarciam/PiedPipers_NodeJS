# Profile API

## DTO

### ContactMethod

```javascript
{
    type: String (email, phone)(Mandatory),
    data: String (Mandatory)
}
```

### Location

```javascript
{
    lat: String (Mandatory),
    long: String (Mandatory)
}
```

### Profile

```javascript
{
    cuid: String (Mandatory),
    name: String,
    location: Location,
    contact: ContactMethod,
    instruments: [String],
    videos: [String],
    description: String,
    photo: String
  }
```

## API

Returns current user profile
GET - `{{endpoint}}/profile`
**Authorized API**

Returns user profile for a given user id
GET - `{{endpoint}}/profile/:cuid`
**Authorized API**

Returns update current profile
PATCH - `{{endpoint}}/profile`
**Authorized API**
body:

```javascript
{
    name: String,
    description: String
  }
```
