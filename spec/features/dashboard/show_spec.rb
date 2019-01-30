# frozen_string_literal: true

require 'rails_helper'

describe 'Authentication - User', type: :feature do
  before { sign_as_user }

  scenario 'can access to my dashboard' do
    current_user = User.last
    visit user_dashboard_index_path current_user
    expect(current_path).to eq user_dashboard_index_path current_user
  end

  xscenario "can't access to dashboard if its not my own" do
    visit user_dashboard_index_path other_user
    expect { get :index }.to raise_error(CanCan::AccessDenied)
  end
end
