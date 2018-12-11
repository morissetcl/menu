# frozen_string_literal: true

FactoryBot.define do
  factory :restaurant_menu do
    association :restaurant, factory: :restaurant
  end
end
