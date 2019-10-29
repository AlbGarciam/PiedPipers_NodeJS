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

### Instruments

```javascript
{
  items: [String];
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
	"name": "Test user 123",
	"description": "Lorem ipsum dolor ...",
	"videos":["https://www.youtube.com/watch?v=41DH065Lfeo&list=RD41DH065Lfeo&start_radio=1"],
	"contact":{
		"type":"email",
		"data":"test_user@gmail.com"
	},
	"instruments":["Bateria"]
}
```

Returns possible values for instruments tags
GET - `{{endpoint}}/profile/tags`
**Authorized API**
