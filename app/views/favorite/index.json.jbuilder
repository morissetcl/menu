json.(@favorites) do |favorite|
  json.id favorite.id
  json.restaurant_id favorite.restaurant_id
  json.user_id favorite.user_id
end
