# frozen_string_literal: true

require 'rails_helper'

describe 'Authentication - User', type: :feature do
  let!(:other_user) { create :user, email: 'other@email.fr' }

  before do
    sign_as_user
    @current_user = User.last
  end

  scenario 'can access to my dashboard' do
    visit user_path @current_user
    expect(current_path).to eq user_path @current_user
  end
end
