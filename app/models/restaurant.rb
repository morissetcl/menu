# frozen_string_literal: true

class Restaurant < ApplicationRecord
  has_one :restaurant_menu
  has_many :dishes, through: :restaurant_menu
  validates :name, :slug, presence: true, uniqueness: true

  geocoded_by :address
  after_validation :geocode, if: ->(obj){ obj.address.present? and obj.address_changed? }
end
