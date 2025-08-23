
SELECT bookings.id,bookings.room_id,bookings.start_time,bookings.end_time,
users.id as contact_staff_id,users.username as contact_staff_username, users.division_id, divisions.name as division_name,
rooms.name
from bookings inner join users on bookings.user_id = users.id
inner join divisions on users.division_id = divisions.id
inner join rooms on bookings.room_id = rooms.id
WHERE users.division_id = (SELECT division_id from users where username = 'user3')
AND rooms.name = 'Board Room D'

LIMIT 5;



-- SELECT DISTINCT users.username
-- from bookings inner join users on bookings.user_id = users.id
-- inner join divisions on users.division_id = divisions.id 
-- WHERE users.division_id = (SELECT division_id from users where username = 'user3');
