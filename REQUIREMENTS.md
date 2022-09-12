# RESTful Routes Endpoints 

## Auth Routes
- localhost:3000/api/auth/login -> `POST` -> returns `jwt token`
- localhost:3000/api/auth/register -> `POST` 

## User Routes
- localhost:3000/api/user/all -> `GET` -> must be logged in `(send jwt token with the request to get access)`
- localhost:3000/api/user/show/:id -> `GET` -> must be logged in `(send jwt token with the request to get access)`
- localhost:3000/api/user/update -> `POST` -> must be logged in `(send jwt token with the request to get access)`
- localhost:3000/api/user/delete -> `POST` -> must be logged in `(send jwt token with the request to get access)`

# Database schema 

### user schema
- `id` -> `type of` -> `Primary key` -> `auto increment`
- `email` -> `type of` -> `String` (varchar(50)) -> `unique`
- `name` -> `type of` -> `String` (varchar(50)) -> `required`
- `age` -> `type of` -> `Int` (INT) -> `required`
- `password` -> `type of` -> `String` (varchar(255)) -> `required`