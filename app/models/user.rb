# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :department, through: :work_areas

  def fullname
    "#{first_name} #{last_name}"
  end
end
