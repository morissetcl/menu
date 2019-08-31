# frozen_string_literal: true

class Restaurant < ApplicationRecord
  has_many :dishes, dependent: :destroy
  validates :name, :slug, presence: true, uniqueness: true

  geocoded_by :full_address
  after_validation :geocode, if: ->(obj) { obj.full_address.present? && obj.full_address_changed? }

  def first_three_tags
    tags.first(3)
  end
end
