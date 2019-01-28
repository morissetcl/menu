# frozen_string_literal: true

require 'rails_helper'

describe 'Authentication - User', type: :feature do
  let(:user) { create :user, email: 'albert@email.fr', password: 'password' }

  scenario '#SignUp Users' do
    visit new_user_session_path
    within find('#sign_up') do
      expect do
        fill_in :user_email, with: 'albert@email.fr'
        fill_in :user_password, with: 'password'
        fill_in :user_password_confirmation, with: 'password'
        click_on "S'inscrire"
      end.to change(User, :count)
      expect(current_path).to eq user_dashboard_index_path User.last
    end
  end

  xscenario '#SignIn Users' do
    visit new_user_session_path
    within find('#sign_up') do
      fill_in :user_email, with: 'albert@email.fr'
      fill_in :user_password, with: 'password'
      click_on 'Se connecter'
    end
  end
end
