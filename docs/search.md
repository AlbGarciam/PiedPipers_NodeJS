# User

## Create

This method allows you to create a user on the database

### Endpoint

`/users/create`

### Method

POST

### Authorized

NO

### Params

- **email**: _String_ (_Mandatory_ ) It must be a unique identifier. Server validates if it is an email
- **password**: _String_(_Required_) It must have 5 or more characters

### Success response

[User DTO](./DTO/user.md)

### Error response

[Error DTO](./DTO/error.md)

## Login

This method allows you to generate an authorization token for the app

### Endpoint

`/users/login`

### Method

POST

### Authorized

NO

### Params

- **email**: _String_ (_Mandatory_ ) It must be a unique identifier. Server validates if it is an email
- **password**: _String_(_Required_) It must have 5 or more characters

### Success response

[User DTO](./DTO/user.md)

### Error response

[Error DTO](./DTO/error.md)

## Profile

This method allows you to search profiles according different criterias

### Endpoint

`/search/profile`

### Method

GET

### Authorized

Yes

### Params

- **name**: _String_ User's name
- **location**: _[Location](./location.md)_ User's location (WIP)
- **instruments**: _String_ User's skills separated by commas
- **friendlyLocation**: _String_ User's friendly location
- **limit**: _Int_ Maximum number of results
- **offset**: _Int_ Results offset
- **lat**: _Float_ Latitude
- **long**: _Float_ Longitude

### Success response

[List DTO](./DTO/list.md) with a user model

### Error response

[Error DTO](./DTO/error.md)
