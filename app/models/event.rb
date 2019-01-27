# frozen_string_literal: true

class Event < ApplicationRecord
  validates :title, presence: true
  belongs_to :restaurant
end
