# frozen_string_literal: true

require 'rails_helper'

describe 'Admin - User', type: :feature do
  let(:admin) { create :admin_user }
  let(:user) { create :user }
  let(:department) { create :department, name: 'Yvelines' }
  let!(:work_area) { create :work_area, user: user, department: department }

  before do
    sign_in_as_admin admin
  end

  scenario '#Show User' do
    visit admin_user_path user
    expect(page).to have_content 'Yvelines'
  end

  scenario '#New User' do
    visit new_admin_user_path
    expect do
      select 'Manager'
      fill_in :user_email, with: 'juanpaulo@email.com'
      fill_in :user_password, with: 'password'
      fill_in :user_password_confirmation, with: 'password'
      click_on 'Create User'
    end.to change(User, :count)
    expect(User.last.reload.role).to eq 'manager'
  end
end
