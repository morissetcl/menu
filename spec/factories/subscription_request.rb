# frozen_string_literal: true

FactoryBot.define do
  factory :subscription_request do
    last_name { 'Gralon' }
    first_name { 'Jean' }
    company { 'Brake' }
    email { 'david@brake.com' }
    prospecting_area { 'Seine et Marne et Paris' }
  end
end
