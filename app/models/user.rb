# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :work_areas
  has_many :departments, through: :work_areas
  accepts_nested_attributes_for :work_areas, allow_destroy: true

  def fullname
    "#{first_name} #{last_name}"
  end
end
