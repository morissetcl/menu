# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    role { 'commercial' }
    email { 'user@example.com' }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
