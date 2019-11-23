# Local

## Create

This method allows you to create a local profile

### Endpoint

`/local`

### Method

POST

### Authorized

Yes

### Params

- **name**: _String_ User's name
- **price**: _Number_ Local's price (€ per hour)
- **contact**: _ContactDTO_ Local's contact
- **location**: _LocationDTO_ Local's location
- **description**: _String_ Local's description

### Success response

[List DTO](./DTO/list.md) with a [Local DTO](./DTO/local.md)

### Error response

[Error DTO](./DTO/error.md)

## Get

This method allows you to get a local by its CUID

### Endpoint

`/local/:cuid`

### Method

GET

### Authorized

Yes

### Params

- **cuid**: _String_ Local identifier

### Success response

[Local DTO](./DTO/local.md)

### Error response

[Error DTO](./DTO/error.md)

## Update

This method allows you to update a local profile

### Endpoint

`/local/:cuid`

### Method

PATCH

### Authorized

Yes

### Params

- **name**: _String_ Local's name
- **price**: _Number_ Local's price (€ per hour)
- **contact**: _ContactDTO_ Local's contact
- **location**: _LocationDTO_ Local's location
- **description**: _String_ Local's description

### Success response

[Local DTO](./DTO/local.md)

### Error response

[Error DTO](./DTO/error.md)

## Delete

This method allows you to remove a local from database

### Endpoint

`/local/:cuid`

### Method

DELETE

### Authorized

Yes

### Params

- **cuid**: _String_ Local identifier

### Success response

HTTP code 200

### Error response

[Error DTO](./DTO/error.md)

## Remove photo

This method allows you to remove a local photo from database

### Endpoint

`/local/photo/:cuid`

### Method

DELETE

### Authorized

Yes

### Path Params

- **cuid**: _String_ Local identifier

### Body params

- **image**: _String_ Image path

### Success response

HTTP code 200

### Error response

[Error DTO](./DTO/error.md)

## Upload photo

This method allows you to add a local photo from database

### Endpoint

`/local/photo/:cuid`

### Method

POST

### Authorized

Yes

### Path Params

- **cuid**: _String_ Local identifier

### Body params

- **image**: _String_ Image path

### Success response

[Local DTO](./DTO/local.md)

### Error response

[Error DTO](./DTO/error.md)
