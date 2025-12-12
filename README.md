## Prerequisites
- Install NodeJs
- Setup PostgreSQL

## Run Back-End (micro-services)
- Create database and tables using `micro-services\src\config\db_schemas.sql` in PostgreSQL
- Update `micro-services\.env` 'postgres' user DB_PASSWORD with your password
- Open terminal/gitbash and goto the micro-services folder
- Run `npm i`
- Run `npm run dev`

## Run Front-End (web-app)
- Open terminal/gitbash and goto the web-app folder
- Run `npm i`
- Run `npm run dev`

## Assumptions
- User can order only one item from any product
