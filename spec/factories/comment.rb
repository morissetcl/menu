# frozen_string_literal: true

FactoryBot.define do
  factory :comment do
    body { 'Good food' }
    user
    restaurant
  end
end
