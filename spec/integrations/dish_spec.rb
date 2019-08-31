# frozen_string_literal: true

require 'rails_helper'

describe 'Dish', type: :integration do
  let!(:restaurant) { create :restaurant, name: 'Bonjour Toi', slug: 'bonjour-toi' }

  scenario 'Update dish_count after a dish creation' do
    create :dish, title: 'Raclette', price: 20, restaurant: restaurant
    expect(restaurant.dishes_count).to eq 1
  end

  scenario 'Update dish_count after destroying a dish' do
    dish = create :dish, title: 'Raclette', price: 20, restaurant: restaurant
    dish.destroy!
    expect(restaurant.dishes_count).to eq 0
  end
end
