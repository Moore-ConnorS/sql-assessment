INSERT INTO USERS (name, email)
VALUES
($1, $2)
RETURNING *;