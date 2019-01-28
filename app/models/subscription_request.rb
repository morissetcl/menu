class SubscriptionRequest < ApplicationRecord
  validates :last_name, :first_name, :company, :prospecting_area, presence: true
  validates :email, uniqueness: true, presence: true
end
