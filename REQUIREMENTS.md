# RESTful Routes Endpoints 

## Auth Routes
- localhost:3000/api/auth/login -> `POST`
- localhost:3000/api/auth/register -> `POST`

## User Routes
- localhost:3000/api/user/all -> `GET`
- localhost:3000/api/user/show/:id -> `GET`
- localhost:3000/api/user/update -> `POST`
- localhost:3000/api/user/delete -> `POST`

# Database schema 

### user schema
- id -> type of -> Primary key -> auto increment
- email -> type of -> String (varchar(50)) -> unique
- name -> type of -> String (varchar(50)) -> required
- age -> type of -> Int (INT) -> required
- password -> type of -> String (varchar(255)) -> required