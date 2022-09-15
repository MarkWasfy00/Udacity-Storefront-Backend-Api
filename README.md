### how to setup and connect to the database in PSQL terminal 📌
`bash
    CREATE DATABASE storefront_db;
    CREATE DATABASE test_db;
`

### setup env variables 📌
- open config folder and open .env.example
  
- NODE_ENV = {PUT_YOUR_ENV} => example : `dev` or `test`

- PGHOST= `{PUT_DATABASE_HOST}`
- PGPORT= `{PUT_DATABASE_PORT}`
- PGUSER= `{PUT_DATABASE_USERNAME}`
- PGPASSWORD= `{PUT_DATABASE_PASSWORD}`
- PGDATABASE= `{PUT_DATABASE_NAME}`

- PGTEST= `{PUT_DATABASE_TEST_NAME}`

- JWT_TOKEN= `{PUT_YOUR_JWT_TOKEN}`
- PEPPER= `{PUT_YOUR_PEPPER_TO_BE_ADDED_TO_PASSWORD}`

## how to start your project 📌
- open config folder and open .env.example
- replace variables with yours
- npm install
- npm run test (to build your project and tests)
- thats it 🪄 you are ready to go


## Routes post data 📌

### User routes (post routes)
`localhost:3000/api/users` -> `POST` -> needs 
- email -> string;
- firstname -> string;
- lastname -> string;
- password -> string;

`localhost:3000/api/users/:id` -> `PUT` -> needs
- email -> string;
- firstname -> string;
- lastname -> string;
- password -> string;

`localhost:3000/api/users/:id` -> `DELETE` -> doesn't need any post data


### Product routes (post & put routes)
`localhost:3000/api/products` -> `POST` -> needs
- name -> string
- price -> number / decimal (max 2 numbers after .)

`localhost:3000/api/products/:id` -> `PUT` -> needs
- name -> string
- price -> number / decimal (max 2 numbers after .)

`localhost:3000/api/products/:id` -> `DELETE` -> doesn't need any data

### Order routes (post routes)
`localhost:3000/api/orders` -> `POST` -> needs
- user_id -> number
- is_complete -> boolean

`localhost:3000/api/orders/:id/products` -> `POST` -> needs
- productId -> number
- quantity -> number

`localhost:3000/api/orders/:id` -> `PUT` -> needs
- user_id -> number
- is_complete -> boolean

`localhost:3000/api/orders/:id/delete` -> `DELETE` -> doesn't need any data