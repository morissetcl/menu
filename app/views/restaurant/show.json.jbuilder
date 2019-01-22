# frozen_string_literal: true

json.id @restaurant.id
json.name @restaurant.name
json.street @restaurant.street
json.city @restaurant.city
json.zip_code @restaurant.zip_code
json.tags @restaurant.tags
json.latitude @restaurant.latitude
json.longitude @restaurant.longitude

json.dishes @dishes do |dish|
  json.call(dish, :title, :price, :description)
end

json.user_id @current_user_id
json.favorite @favorite
json.booked @is_booked
