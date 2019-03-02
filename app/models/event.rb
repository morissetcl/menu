# frozen_string_literal: true

class Event < ApplicationRecord
  validates :title, :date, presence: true
  belongs_to :restaurant
end
