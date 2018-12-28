# frozen_string_literal: true

class Department < ApplicationRecord
  validates :name, :zip_code, presence: true, uniqueness: true
end
