# frozen_string_literal: true

require 'rails_helper'

describe WorkArea, type: :model do
  it { should belong_to :user }
  it { should belong_to :department }
end
