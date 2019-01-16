# frozen_string_literal: true

FactoryBot.define do
  factory :favorite do
    association :restaurant, factory: :restaurant
    association :user, factory: :user
  end
end
