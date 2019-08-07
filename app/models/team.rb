# frozen_string_literal: true

class Team < ApplicationRecord
  validates :name, presence: true
  belongs_to :user
end
