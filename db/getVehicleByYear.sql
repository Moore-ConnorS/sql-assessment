SELECT vehicles.*, users.name
FROM vehicles INNER JOIN users
ON vehicles.owner_id = users.id
WHERE year > 2000
ORDER BY year DESC
