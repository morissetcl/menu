# frozen_string_literal: true

require 'rails_helper'
require 'sidekiq/testing'

describe GetDishesJusteatService do
  ActiveJob::Base.queue_adapter = :test
  Sidekiq::Testing.fake!

  before(:each) do
    @doc = Nokogiri::HTML(open(Rails.root + 'spec/support/files/justeat/response_restaurant_menu.html'))
  end

  it 'Create new dishes' do
    resto = Restaurant.create(name: 'Doudou', slug: 'doudou')
    resto_menu = RestaurantMenu.create(restaurant: resto)
    expect do
      GetDishesJusteatService.call(@doc, resto_menu)
    end.to change { Dish.count }
  end
end
