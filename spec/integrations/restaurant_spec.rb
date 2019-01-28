# frozen_string_literal: true

require 'rails_helper'

describe 'Restaurant', type: :integration do
  let!(:restaurant) { create :restaurant, name: 'Bonjour Toi', slug: 'bonjour-toi' }
  let!(:restaurant_menu) { create :restaurant_menu, restaurant: restaurant }
  let!(:dish) { create :dish, title: 'Bruschetta', restaurant_menu: restaurant_menu }

  scenario 'Delete on cascade restaurant_menu and dish' do
    expect do
      restaurant.destroy!
    end.to change { RestaurantMenu.count }
      .and change { Dish.count }
  end
end
