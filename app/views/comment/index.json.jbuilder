# frozen_string_literal: true

json.call(@comments) do |comment|
  json.id comment.id
  json.name comment.name
  json.street comment.street
  json.city comment.city
  json.zip_code comment.zip_code
  json.dishes_count comment.dishes_count
  json.tags comment.tags
  json.full_address comment.full_address
  json.tags comment.first_three_tags
end
