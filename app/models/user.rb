# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :role, presence: true
  has_many :work_areas
  has_many :departments, through: :work_areas
  belongs_to :team, optional: true
  accepts_nested_attributes_for :work_areas, allow_destroy: true

  enum role: { manager: 0, commercial: 1 }

  def fullname
    "#{first_name} #{last_name}"
  end
end
