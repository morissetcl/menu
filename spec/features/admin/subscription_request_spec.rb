# frozen_string_literal: true

require 'rails_helper'

describe 'Admin - Restaurant', type: :feature do
  let(:admin) { create :admin_user }
  let!(:subscription_request) do
    create :subscription_request, last_name: 'Koala', first_name: 'David', email: 'koala@gmail.com',
                                  company: 'Gatering', prospecting_area: 'Eure et Seine-Maritime'
  end

  before do
    sign_in_as_admin admin
  end

  scenario '#Index Restaurants' do
    visit admin_subscription_requests_path
    expect(page).to have_content 'Koala'
    expect(page).to have_content 'Gatering'
  end
end
