# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SubscriptionRequest, type: :model do
  it { should validate_presence_of :last_name }
  it { should validate_presence_of :first_name }
  it { should validate_presence_of :company }
  it { should validate_presence_of :email }
  it { should validate_uniqueness_of :email }
  it { should validate_presence_of :prospecting_area }
end
