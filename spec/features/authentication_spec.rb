# frozen_string_literal: true

require 'rails_helper'

describe 'Authentication - User', type: :feature do
  let(:user) { create :user }

  scenario '#SignUp Users' do
    visit new_user_registration_path
    within find('#test1') do
      expect do
        fill_in :user_email, with: 'albert@email.fr'
        fill_in :user_password, with: 'password'
        fill_in :user_password_confirmation, with: 'password'
        click_on "S'inscrire"
      end.to change { User.count }
    end
  end

  scenario '#SignIn Users' do
    visit new_user_session_path
    within find('#test2') do
      fill_in :user_email, with: 'albert@email.fr'
      fill_in :user_password, with: 'password'
      click_on 'Se connecter'
    end
    expect(page.status_code).to be(200)
  end
end
