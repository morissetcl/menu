# frozen_string_literal: true

FactoryBot.define do
  factory :team do
    name { 'Metro Paris 18' }
    association :user, factory: :user
  end
end
