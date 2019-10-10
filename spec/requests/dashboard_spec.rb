# frozen_string_literal: true

require 'rails_helper'

describe 'Dashboard' do
  describe 'GET informations about sector' do
    let!(:user) { create :user }
    let!(:department) { create :department, zip_code: '75000', name: 'Paris' }
    let!(:work_area) { create :work_area, department: department, user: user }

    let!(:restaurant) do
      create :restaurant, name: 'Burger Factory',
                          slug: 'burger-factory',
                          city: 'Paris',
                          department: 'Paris'
    end
    let!(:dish) { create :dish, title: 'Raclette', restaurant: restaurant }
    let!(:dish2) { create :dish, title: 'Fondue', restaurant: restaurant }

    before(:each) do
      get "/private/#{user.id}/dashboard.json"
      @json = JSON.parse(response.body)
    end

    it do
      expect(@json['dish_counter']).to eq 2
      expect(@json['restaurant_counter']).to eq 1
      expect(@json['last_three_restaurant'][0]['name']).to eq 'Burger Factory'
    end
  end
end
