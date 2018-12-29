# frozen_string_literal: true

json.restaurants do
  json.array!(@restaurants) do |restaurant|
    json.id restaurant.id
    json.name restaurant.name
    json.street restaurant.street
    json.city restaurant.city
    json.zip_code restaurant.zip_code
  end
end
