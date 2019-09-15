# frozen_string_literal: true

require 'rails_helper'

describe 'Restaurant', type: :integration do
  let!(:user) { create :user }

  let!(:restaurant) { create :restaurant, name: 'Bonjour Toi', slug: 'bonjour-toi' }
  let!(:dish) { create :dish, title: 'Bruschetta', restaurant: restaurant }
  let!(:comment) { create :comment, body: 'Very good', user: user, restaurant: restaurant }

  scenario 'Delete on cascade restaurant_menu and dish' do
    expect do
      restaurant.destroy!
    end.to change(Dish, :count)
      .and change(Comment, :count)
  end
end
