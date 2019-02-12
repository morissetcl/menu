# frozen_string_literal: true

class RestaurantMenu < ApplicationRecord
  belongs_to :restaurant
  has_many :dishes
  validates :restaurant_id, uniqueness: true
end
