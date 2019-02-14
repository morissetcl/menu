# frozen_string_literal: true

require 'rails_helper'

describe Comment, type: :model do
  it do
    is_expected.to belong_to :user
    is_expected.to belong_to :restaurant
    is_expected.to validate_presence_of(:body)
  end
end
