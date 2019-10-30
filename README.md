# PiedPipers_NodeJS

## Requirements
What things you need to install the software and how to install them
* nodejs - v10.14.1
* mongoDB - v4.0.1
* @babel/cli - ^7.1.5
* @babel/core - ^7.1.6
* @babel/node - ^7.0.0

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

**Params**
* `email`(String)(**Required**) This must be a unique identifier. Server validates if it is an email
* `password`: (String)(**Required**) This must have 5 or more characters

**Success response**

[User DTO](#user)

## DTO
### User
This DTO represents a user inside the server. It has the following structure:
```javascript
{
    "email": String,
    "id": String,
    "addDate": String "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
}
```

