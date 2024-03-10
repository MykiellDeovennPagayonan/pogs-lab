# Software Testing Lab
## Team PROgrammers
- Mykiell Pagayonan
- Chad Andrada

## Install all dependencies

To begin, install all the dependencies in the root, client, and server directory with this script!

```bash
npm run i-all
```

## Setting up the local database

After installing the dependencies, create a .env file inside the poggers-server folder. (folder structure should look like poggers-server/.env)

Inside the .env, paste the database URL which is structured as follows:

```bash
DATABASE_URL="protocol://username:password@host:port/database_name?options"
```

If the database is on your local machine, can include sslmode=disable in the options.

Refer to the [official dbmate documentation](https://github.com/amacneil/dbmate#usage) for more info.

After the URL has been properly set up, run these commands:

```bash
cd poggers-server
# then
dbmate up

# if dbmate up gives an error, run this instead:
npx dbmate up
```

## Run both frontend and backend (Using Concurrently)

After installing dependencies and setting up the database, open a terminal on root directory and run:

```bash
npm start
```

This should run the dev script on both frontend and backend simultaneously using concurrently. Visit http://localhost:3000 to check it out!

## Perform the tests using Jest

This project uses Jest as a Testing Framework. To run the tests:

```bash
cd poggers-server
# then
npm test
```