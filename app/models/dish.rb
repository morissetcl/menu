# frozen_string_literal: true

class Dish < ApplicationRecord
  belongs_to :restaurant
  validates_uniqueness_of :title, scope: :restaurant_id
end
