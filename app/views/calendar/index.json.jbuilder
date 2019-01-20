# frozen_string_literal: true

json.events do
  json.array!(@events) do |event|
    json.id event.id
    json.title event.title
    json.date event.date
    json.restaurant event.restaurant
    json.user_id event.user_id
  end
end
