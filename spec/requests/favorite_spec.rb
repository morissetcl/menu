# frozen_string_literal: true

require 'rails_helper'

describe 'Favorite' do
  describe 'GET favorite' do
    let!(:user) { create :user }
    let!(:restaurant) { create :restaurant, name: 'Burger Factory', slug: 'burger-factory', city: 'Paris' }
    let!(:favorite) { create :favorite, user: user, restaurant: restaurant }
    let(:restaurant_menu) { create :restaurant_menu, restaurant: restaurant }
    let!(:dish) { create :dish, title: 'Raclette', restaurant_menu: restaurant_menu }

    before(:each) do
      get "/private/#{user.id}/favorite.json"
      @json = JSON.parse(response.body).first
    end

    it do
      expect(@json['city']).to eq 'Paris'
      expect(@json['name']).to eq 'Burger Factory'
      expect(@json['dishes_count']).to eq 1
    end
  end
end
