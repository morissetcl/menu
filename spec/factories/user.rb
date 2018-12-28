# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { 'user@example.com' }
    password { 'password' }
    password_confirmation { 'password' }
    after(:create) do |user|
      create_list(:department, 1, user_id: user.id)
    end
  end
end
