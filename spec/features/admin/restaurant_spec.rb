# frozen_string_literal: true

require 'rails_helper'

describe 'Admin - Restaurant', type: :feature do
  let(:admin) { create :admin_user }
  let(:restaurant_1) { create :restaurant, name: 'The Garden', slug: 'the-garden' }
  let(:restaurant_menu) { create :restaurant_menu, restaurant: restaurant_1 }
  let!(:dish_1) do
    create :dish, restaurant_menu: restaurant_menu,
                  title: 'Panacotta',
                  description: 'cream with cheese',
                  price: '10'
  end
  let!(:dish_2) do
    create :dish, restaurant_menu: restaurant_menu,
                  title: 'Raclette',
                  description: 'french cheese with ham',
                  price: '25'
  end

  before do
    sign_in_as_admin admin
    3.times do |a|
      create(:restaurant, name: "restaurant #{a}", slug: "restaurant-#{a}")
    end
  end

  scenario '#Index Restaurants' do
    visit admin_restaurants_path
    expect(page).to have_content 'The Garden'
    expect(page).to have_content 'restaurant 0'
  end

  scenario '#Show Restaurants' do
    visit admin_restaurant_path restaurant_1
    expect(page).to have_content 'The Garden'
    expect(page).to have_content 'Panacotta'
    expect(page).to have_content 'french cheese with ham'
  end
end
