# Search

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
- **instruments**: _String_ User's skills separated by commas
- **lat**: _Float_ Latitude (must be present if sending long)
- **long**: _Float_ Longitude (must be present if sending lat)
- **maxDistance**: _Float_ Max distance of search (in kilometers)
- **limit**: _Int_ Maximum number of results
- **offset**: _Int_ Results offset

### Success response

[List DTO](./DTO/list.md) with a [User DTO](./DTO/user.md)

### Error response

[Error DTO](./DTO/error.md)

## Locals

This method allows you to search locals according different criterias

### Endpoint

`/search/local`

### Method

GET

### Authorized

Yes

### Params

- **name**: _String_ User's name
- **price**: _Number_ Max price of local
- **lat**: _Float_ Latitude (must be present if sending long)
- **long**: _Float_ Longitude (must be present if sending lat)
- **maxDistance**: _Float_ Max distance of search (in kilometers)
- **limit**: _Int_ Maximum number of results
- **offset**: _Int_ Results offset

### Success response

[List DTO](./DTO/list.md) with a [Local DTO](./DTO/local.md)

### Error response

[Error DTO](./DTO/error.md)
