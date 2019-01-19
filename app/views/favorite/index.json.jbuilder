# frozen_string_literal: true

json.call(@favorites) do |favorite|
  json.id favorite.id
  json.name favorite.name
  json.street favorite.street
  json.city favorite.city
  json.zip_code favorite.zip_code
  json.dishes_count favorite.dishes_count
  json.tags favorite.tags
end
