# frozen_string_literal: true

json.events do
  json.array!(@events) do |event|
    json.id event.id
    json.title event.title
    json.start_date event.start_date
    json.end_date event.end_date
    json.restaurant event.restaurant
    json.user_id event.user_id
  end
end
