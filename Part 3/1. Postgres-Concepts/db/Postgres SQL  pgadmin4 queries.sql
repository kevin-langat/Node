SELECT * FROM users
SELECT * FROM posts
ORDER BY created_at ASC


SELECT users.id, users.username, users.email, posts.title, posts.content
FROM users
LEFT JOIN posts ON users.id = posts.user_id


SELECT users.username, COUNT(posts.id) AS post_count
FROM users
LEFT JOIN posts ON users.id = posts.user_id
GROUP BY users.id, users.username














  