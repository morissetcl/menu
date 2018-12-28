require 'rails_helper'

RSpec.describe Department, type: :model do
  it { should validate_presence_of :zip_code }
  it { should validate_presence_of :name }
  it { should validate_uniqueness_of :name }
  it { should validate_uniqueness_of :zip_code }
end
