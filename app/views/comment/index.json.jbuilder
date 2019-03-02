# frozen_string_literal: true

json.call(@comments) do |comment|
  json.id comment.created_at
  json.id comment.id
  json.body comment.body
end
