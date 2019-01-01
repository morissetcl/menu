# frozen_string_literal: true

class Restaurant < ApplicationRecord
  has_one :restaurant_menu
  has_many :dishes, through: :restaurant_menu
  validates :name, :slug, presence: true, uniqueness: true
end
