# frozen_string_literal: true

require 'rails_helper'

describe 'Restaurant', type: :integration do
  let!(:user) { create :user }

  let!(:restaurant) { create :restaurant, name: 'Bonjour Toi', slug: 'bonjour-toi' }
  let!(:restaurant_menu) { create :restaurant_menu, restaurant: restaurant }
  let!(:dish) { create :dish, title: 'Bruschetta', restaurant_menu: restaurant_menu }
  let!(:comment) { create :comment, body: 'Very good', user: user, restaurant: restaurant }

  scenario 'Delete on cascade restaurant_menu and dish' do
    expect do
      restaurant.destroy!
    end.to change { RestaurantMenu.count }
      .and change { Dish.count }
      .and change { Comment.count }
  end
end
