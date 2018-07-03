# Timetracker API

## Prerequisities

Following softwares are required to run the application.

- Node 8.11.x
- Npm 5.6.x
- Mysql 5.7+

## App setup

1. Install all dependencies by running the command  

```
npm i
```

2. Create Database `timetracker` in MySQL database

```
create database timetracker;
```

3. The following variables need to be configured in `/config/default.js`:

- LOG_LEVEL -> Log level required for the application
- API_VERSION -> API version will be prefixed in the API URL
- PORT -> Port in which API should serve
- MYSQL_URL -> MySQL Database URL
- JSON_WEB_TOKEN_SECRET -> Secret for JWT Token

Variables MYSQL_URL, JSON_WEB_TOKEN_SECRET, PORT are driven from Environment variables.

4. Insert dummy users into the Database by running the command

```
npm run generate
```

## Running the Application

1. To start the application, execute command

```
npm start
```

2. Import the Postman environment and collection in `docs` directory

3. Test the End points using the Postman collection

All the Users defined in scripts/data/users.json has password `"abc123!@#"`

## Miscellaneous

1. To lint the JS files

```
npm run lint
```

2. To start application in development mode, execute

```
npm run dev
```

## Hosting

API is hosted at https://timetrackermockapi.herokuapp.com/api/v1