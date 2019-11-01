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

## Update

This method allows you to update a user password on the database. This method can only be called if the authorization token is valid, if not, you should regenerate the token

### Endpoint

`/users/update`

### Method

PATCH

### Authorized

Yes

### Params

- **password**: _String_ (_Mandatory_) New password. It must have 5 or more characters

### Success response

[User DTO](./DTO/user.md)

### Error response

[Error DTO](./DTO/error.md)
