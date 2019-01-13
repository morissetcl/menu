class Favorite < ApplicationRecord
  validates_uniqueness_of :restaurant, scope: :user_id
  belongs_to :restaurant
  belongs_to :user
end
