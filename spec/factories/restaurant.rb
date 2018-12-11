# frozen_string_literal: true

FactoryBot.define do
  factory :restaurant do
    name 'Super Resto'
    slug 'super-resto'
    price_range '10-20'
    address '2 place de Rouen 76000 Rouen'
    source 'unknow'
  end
end
