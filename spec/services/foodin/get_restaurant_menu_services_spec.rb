# frozen_string_literal: true

require 'rails_helper'
require 'sidekiq/testing'

describe GetRestaurantMenuFoodinService do
  ActiveJob::Base.queue_adapter = :test
  Sidekiq::Testing.fake!

  let(:url) { "#{Rails.root}/spec/support/files/foodin/response_restaurant_menu.html" }
  let(:reponse_body) { File.open(url).read }

  let(:stub_restaurant_menu_foodin) do
    stub_request(:get, 'https://foodin.fr/cart/196/El-Tio')
      .to_return(status: 200, body: reponse_body, headers: {})
  end

  before do
    stub_restaurant_menu_foodin
  end

  it 'Create a new restaurant menu and dish' do
    link = '/cart/196/El-Tio'
    restaurant = Restaurant.create(name: 'El Tio', slug: 'el-tio')
    expect do
      GetRestaurantMenuFoodinService.call(link, restaurant.id)
      p restaurant
    end.to change { RestaurantMenu.count }
      .and change { Dish.count }
  end
end