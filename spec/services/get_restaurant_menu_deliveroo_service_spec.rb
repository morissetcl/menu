require 'rails_helper'
require 'sidekiq/testing'

describe GetRestaurantMenuDeliverooService do
  ActiveJob::Base.queue_adapter = :test
  Sidekiq::Testing.fake!

  before(:each) do
    @doc = Nokogiri::HTML(open(Rails.root + 'spec/support/files/response_deliveroo.html'))
  end

  it 'Create a new restaurant menu and dish' do
    restaurant = Restaurant.create!(name: 'creperie 21 martorell', slug: 'creperie-21-martorell' )
    link = "https://deliveroo.fr/menu/paris/9eme-opera/creperie-21-martorell?day=today&time=ASAP"
    expect do
      GetRestaurantMenuDeliverooService.call(link, restaurant.slug)
    end.to change { RestaurantMenu.count }
  end
end
