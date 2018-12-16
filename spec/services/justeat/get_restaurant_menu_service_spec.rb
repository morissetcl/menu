# frozen_string_literal: true

require 'rails_helper'
require 'sidekiq/testing'

describe Justeat::GetRestaurantMenuService do
  ActiveJob::Base.queue_adapter = :test
  Sidekiq::Testing.fake!

  let(:url) { "#{Rails.root}/spec/support/files/justeat/response_restaurant_menu.html" }
  let(:reponse_body) { File.open(url).read }

  let(:stub_restaurant_menu_justeat) do
    stub_request(:get, 'https://www.just-eat.fr/restaurant-livraison-a-domicile/restaurant/planet-s-burger/carte')
      .to_return(status: 200, body: reponse_body, headers: {})
  end

  before do
    stub_restaurant_menu_justeat
  end

  it 'Create a new restaurant_menu and new dishes' do
    restaurant = Restaurant.create!(name: "Planet's Burger", slug: 'planet-s-burger')
    link = 'https://www.just-eat.fr/restaurant-livraison-a-domicile/restaurant/planet-s-burger/carte'
    expect do
      Justeat::GetRestaurantMenuService.call(link, restaurant.slug)
    end.to change(RestaurantMenu, :count)
  end
end
