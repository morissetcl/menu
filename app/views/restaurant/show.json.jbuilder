# frozen_string_literal: true

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
