# frozen_string_literal: true

require 'rails_helper'
require 'sidekiq/testing'

describe Restovisio::GetRestaurantMenuService do
  ActiveJob::Base.queue_adapter = :test
  Sidekiq::Testing.fake!

  let(:url) { "#{Rails.root}/spec/support/files/restovisio/response_restaurant_menu.html" }
  let(:reponse_body) { File.open(url).read }

  let(:stub_restaurant_menu_restovisio) do
    stub_request(:get, 'http://www.restovisio.com/restaurant/le-bistrot-dangele-6961.htm')
      .to_return(status: 200, body: reponse_body, headers: {})
  end

  before do
    stub_restaurant_menu_restovisio
  end

  it 'Create a new restaurant_menu and dish' do
    restaurant = Restaurant.create!(name: 'creperie 21 martorell', slug: 'creperie-21-martorell')
    link = '/restaurant/le-bistrot-dangele-6961.htm'
    expect do
      Restovisio::GetRestaurantMenuService.call(link, restaurant.id)
    end.to change(RestaurantMenu, :count)
  end
end
