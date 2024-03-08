# Software Testing Lab
## Team PROgrammers
- Mykiell Pagayonan
- Chad Andrada

## Install all dependencies

To start, install all the dependencies in the root, client, and server directory with this script!

```bash
npm run i-all
```

## Run both frontend and backend (Using Concurrently)

Open a terminal on root directory and run:

```bash
npm start
```

This should run the dev script on both frontend and backend simultaneously.

## Setting up the local database

Open a new terminal and run:

```bash
cd poggers-server
# then
dbmate up
```

This will load the migrations according to the DATABASE_URL from poggers-server/.env file. The URL is structured as follows:

```bash
DATABASE_URL="protocol://username:password@host:port/database_name?options"
```

If the database is on your local machine, you can include sslmode=disable in the options.

Refer to the [official dbmate documentation](https://github.com/amacneil/dbmate#usage) for more info.

## Perform the tests using Jest

This project uses Jest as a Testing Framework. To run the tests:

```bash
cd poggers-server
# then
npm test
```