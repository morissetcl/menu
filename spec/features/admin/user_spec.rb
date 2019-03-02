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
end
