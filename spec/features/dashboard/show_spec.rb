# frozen_string_literal: true

require 'rails_helper'

describe 'Authentication - User', type: :feature do
  before { sign_as_user }

  let!(:current_user) { User.last }
  let(:department) { build :department, zip_code: '95', name: "Val d'Oise" }
  let!(:work_area) { create :work_area, user: current_user, department: department }

  scenario 'can access to my dashboard' do
    visit user_dashboard_path current_user
    expect(current_path).to eq user_dashboard_path current_user
  end

  xscenario "can't access to dashboard if its not my own" do
    visit user_dashboard_path other_user
    expect { get :index }.to raise_error(CanCan::AccessDenied)
  end
end
