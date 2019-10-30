# PiedPipers_NodeJS

## Requirements

What things you need to install the software and how to install them

- nodejs - v10.14.1
- mongoDB - v4.0.1
- @babel/cli - ^7.1.5
- @babel/core - ^7.1.6
- @babel/node - ^7.0.0

## Installation

In order to deploy this project you should follow these steps:

1. Clone this repository:

```bash
  git clone https://github.com/AlbGarciam/PiedPipers_NodeJS.git
```

2. Configure `.env` file. You have an example on `.env.variables`
3. Update `etc/keys/private.key` and `etc/keys/public.pem` to secure JWT
4. Install dependencies

```bash
  npm install
```

4. Run script to prepare database. This script will create a directory/subdirectory at `database/db`

```bash
  npm run preparedb
```

5. Run script to start database. It will use mongo configuration at `etc/mongo.conf`

```bash
  npm run database
```

6. Run script to start server. This script will run a nodemon to run the server

```bash
  npm run start
```

## API

### User

#### Create

This method allows you to create a user on the database

**Endpoint**
`/users/create`

**Method**
POST

**Authorized**
NO

**Params**

- `email`(String)(**Required**) This must be a unique identifier. Server validates if it is an email
- `password`: (String)(**Required**) This must have 5 or more characters

**Success response**

[User DTO](#user-dto)

**Error response**

[Error DTO](#error-dto)

#### Login

This method allows you to generate an authorization token for the app

**Endpoint**
`/users/login`

**Method**
POST

**Authorized**
NO

**Params**

- `email`(String)(**Required**) This must be a unique identifier. Server validates if it is an email
- `password`: (String)(**Required**) This must have 5 or more characters

**Success response**

[User DTO](#user-dto)

**Error response**

[Error DTO](#error-dto)

#### Update

This method allows you to update a user password on the database. This method can only be called if the authorization token is valid, if not, you should regenerate the token

**Endpoint**
`/users/update`

**Method**
PATCH

**Authorized**
Yes

**Params**

- `password`: (String)(**Required**) This must have 5 or more characters

**Success response**

[User DTO](#user-dto)

**Error response**

[Error DTO](#error-dto)

### Profile

#### Get

This method allows you to get the profile associated to provided CUID

**Endpoint**
`/profile`

**Method**
GET

**Authorized**
YES

**Params**

None

**Success response**

[Profile DTO](#profile-dto)

**Error response**

[Error DTO](#error-dto)

#### Get by Id

This method allows you to get the profile associated to authorization token

**Endpoint**
`/profile/:cuid`

**Method**
GET

**Authorized**
YES

**Params**

- cuid: profile identifier

**Success response**

[Profile DTO](#profile-dto)

**Error response**

[Error DTO](#error-dto)

#### Update

This method allows you to update token-associated profile

**Endpoint**
`/profile`

**Method**
PATCH

**Authorized**
YES

**Params**

[Profile DTO](#profile-dto)

**Success response**

[Profile DTO](#profile-dto)

**Error response**

[Error DTO](#error-dto)

## DTO

### User DTO

This DTO represents an user inside the server. It has the following structure:

```javascript
{
    "email": String,
    "id": String,
    "addDate": String "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
}
```

### Error DTO

This DTO represents an error inside the server. It has the following structure:

```javascript
{
    "code": Int,
    "ecode": Int,
    "message": String
}
```

The possible values of these fields are listed on [error codes](#error-codes)

### Profile DTO

This DTO represents a profile on the server. It has the following structure

```javascript
{
  "id": String (Mandatory),
  "name": String ,
	"description": String,
	"videos":[String],
	"contact": ContactMethodDTO,
  "instruments":[String],
  "location": LocationDTO
}
```

### ContactMethod DTO

```javascript
{
    "type": enum("email", "phone")(Mandatory),
    "data": String (Mandatory)
}
```

### Location DTO

```javascript
{
    "lat": String (Mandatory),
    "long": String (Mandatory)
}
```

## Constants

### Error codes

```javascript
/** CODES */
const CODE_SERVER_ERROR = 500;
const CODE_LOGIC_ERROR = 404;
const CODE_AUTHORIZATION_ERROR = 403;
const CODE_VALIDATION_ERROR = 422;

/** ECODES */
const ECODE_DATABASE_ERROR = 1000;
const ECODE_ITEM_NOT_FOUND = 1001;
const ECODE_INVALID_PASSWORD = 1002;
const ECODE_INVALID_TOKEN = 1003;
const ECODE_UNKNOWN_ERROR = 1004;
const ECODE_DUPLICATED_ITEM = 1005;
const ECODE_LOGIN_REQUIRED = 1006;
const ECODE_VALIDATION_ERROR = 1007;

/** MESSAGES */
const MSG_ITEM_NOT_FOUND = "Item was not found";
const MSG_INVALID_PASSWORD = "Invalid password";
const MSG_INVALID_TOKEN = "Invalid token";
const MSG_UNKNOWN_ERROR = "Unexpected error";
const MSG_LOGIN_REQUIRED =
  "It is necessary to relogin the user before taking any action";
const MSG_DUPLICATED_ITEM = "This item already exists";
const MSG_VALIDATION_ERROR = "One or more parameters are invalid";
const MSG_INVALID_INSTRUMENTS_ERROR = "Provided instruments are invalid";
const MSG_INVALID_LOCATION_ERROR = "Provided instruments are invalid";
```
