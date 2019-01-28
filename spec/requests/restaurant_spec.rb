# frozen_string_literal: true

require 'rails_helper'

xdescribe 'Favorite' do
  describe 'GET restaurant' do
    let!(:user) { create :user }
    let!(:restaurant) do
      create :restaurant, name: 'Burger Factory', slug: 'burger-factory', city: 'Paris'
    end
    let(:restaurant_menu) { create :restaurant_menu, restaurant: restaurant }
    let!(:dish) { create :dish, title: 'Raclette', restaurant_menu: restaurant_menu }
    let!(:dish2) { create :dish, title: 'Fondue', restaurant_menu: restaurant_menu }

    before(:each) do
      get "/restaurant/#{restaurant.id}.json"
      @json = JSON.parse(response.body)
    end

    it do
      expect(@json['name']).to eq 'Burger Factory'
      expect(@json['city']).to eq 'Paris'
      expect(@json['dishes'][0]['title']).to eq 'Fondue'
      expect(@json['dishes'][1]['title']).to eq 'Raclette'
    end
  end
end
