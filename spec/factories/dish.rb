# frozen_string_literal: true

FactoryBot.define do
  factory :dish do
    association :restaurant_menu, factory: :restaurant_menu
    title { 'Gratin dauphinois' }
    price { '10' }
    description { 'Pomme de terre with cheese' }
  end
end
