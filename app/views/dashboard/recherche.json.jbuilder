# frozen_string_literal: true

json.restaurants do
  json.array!(@restaurants) do |restaurant|
    dishes_count = restaurant.dishes.count
    json.id restaurant.id
    json.name restaurant.name
    json.street restaurant.street
    json.city restaurant.city
    json.zip_code restaurant.zip_code
    json.dishes_count dishes_count
  end
end
