## how to setup and connect to the database 📌
- open config folder and open .env.example
- replace variables with yours
- npm install
- npm run test (to build your project and tests)
- thats it 🪄 you are ready to go


## Routes post data

### User routes (post routes)
`localhost:3000/api/users` -> needs 
- email -> string;
- firstname -> string;
- lastname -> string;
- password -> string;

`localhost:3000/api/users/:id/update` -> needs
- email -> string;
- firstname -> string;
- lastname -> string;
- password -> string;

`localhost:3000/api/users/:id/delete` -> doesn't need any post data


### Product routes (post routes)
`localhost:3000/api/products` -> needs
- name -> string
- price -> number / decimal (max 2 numbers after .)

`localhost:3000/api/products/:id/update` -> needs
- name -> string
- price -> number / decimal (max 2 numbers after .)

`localhost:3000/api/products/:id/delete` -> doesn't need any post data


### Order routes (post routes)
`localhost:3000/api/orders` -> needs
- user_id -> number
- is_complete -> boolean

`localhost:3000/api/orders/:id/products` -> needs
- productId -> number
- quantity -> number

`localhost:3000/api/orders/:id/update` -> needs
- user_id -> number
- is_complete -> boolean

`localhost:3000/api/orders/:id/delete` -> doesn't need any post data