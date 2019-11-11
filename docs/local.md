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

## Update

This method allows you to update a local profile

### Endpoint

`/local/:cuid`

### Method

PATCH

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
