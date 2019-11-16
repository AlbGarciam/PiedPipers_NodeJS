# Profile

## Get

This method allows you to get the profile associated to provided CUID

### Endpoint

`/profile`

### Method

GET

### Authorized

YES

### Params

None

### Success response

[Profile DTO](DTO/profile.md)

### Error response

[Error DTO](DTO/error.md)

## Get by Id

This method allows you to get the profile associated to authorization token

### Endpoint

`/profile/:cuid`

### Method

GET

### Authorized

YES

### Params

- cuid: profile identifier

### Success response

[Profile DTO](DTO/profile.md)

### Error response

[Error DTO](DTO/error.md)

## Update

This method allows you to update token-associated profile

### Endpoint

`/profile`

### Method

PATCH

### Authorized

YES

### Params

- **name** _String_ User's name
- **location** _[LocationDTO](DTO/location.md)_ User's location
- **contact** _[ContactDTO](DTO/contact.md)_ User's contact method
- **description** _String_ User's description
- **videos** _[String]_ User's videos (only video identifiers)
- **instruments** _[String]_ User's instruments
- **friendlyLocation** _String_ User's friendly location

### Success response

[Profile DTO](DTO/profile.md)

### Error response

[Error DTO](DTO/error.md)

## Update avatar

This method allows you to update token-associated avatar profile

### Endpoint

`/profile/avatar`

### Method

POST

### Authorized

YES

### Params

- **photo**: (Mandatory) avatar file

### Success response

[Profile DTO](DTO/profile.md)

### Error response

[Error DTO](DTO/error.md)
