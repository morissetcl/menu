# frozen_string_literal: true

require 'rails_helper'

describe 'Authentication - User', type: :feature do
  let(:user) { create :user }
  let!(:other_user) { create :user, email: 'other@email.fr' }

  before { sign_as_user }

  scenario "can access to my dashboard" do
    visit user_path user
    expect(current_path).to eq user_path user
  end

  scenario "can't access to dashboard if its not my own", focus: true do
    visit user_path other_user
    expect(current_path).to_not eq user_path other_user
  end
end
