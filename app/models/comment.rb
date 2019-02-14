# frozen_string_literal: true

class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant
  validates :body, presence: true
end