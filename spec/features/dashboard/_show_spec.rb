# frozen_string_literal: true

require 'rails_helper'

describe 'Authentication - User', type: :feature do
  let!(:other_user) { create :user, email: 'other@email.fr' }

  before { sign_as_user }

  scenario 'can access to my dashboard' do
    current_user = User.last
    visit user_path current_user
    expect(current_path).to eq user_path current_user

  end

  scenario "can't access to dashboard if its not my own" do
    visit user_path other_user
    expect(page.status_code).to be(403)
  end
end
