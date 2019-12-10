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
4. Update `etc/keys/firebaseAccountKey.json` with your own key
5. Install dependencies

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

Documentation can be found [here](https://albgarciam.github.io/PiedPipers_NodeJS/)

To generate documentation run the following command:

```bash
npm run doc
```
