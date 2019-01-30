# frozen_string_literal: true

require 'rails_helper'

describe 'Authentication - User', type: :feature do
  let(:user) { create :user, email: 'albert@email.fr', password: 'password' }

  scenario 'Add subscription request' do
    visit new_user_session_path
    within find('#sign_up') do
      expect do
        fill_in :subscription_request_last_name, with: 'albert@email.fr'
        fill_in :subscription_request_first_name, with: 'password'
        fill_in :subscription_request_email, with: 'albert@email.fr'
        fill_in :subscription_request_company, with: 'password'
        fill_in :subscription_request_prospecting_area, with: 'password'
        click_on 'Je demande un accès'
      end.to change(SubscriptionRequest, :count)
    end
  end
end
