CREATE TABLE orders(
    id SERIAL PRIMARY KEY, 
    user_id BIGINT REFERENCES users(id), 
    is_complete BOOLEAN NOT NULL
);