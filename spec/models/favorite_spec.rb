require 'rails_helper'

RSpec.describe Favorite, type: :model do
  it { should belong_to :user }
  it { should belong_to :restaurant }
  it { should validate_uniqueness_of(:restaurant).scoped_to(:user_id) }
end
