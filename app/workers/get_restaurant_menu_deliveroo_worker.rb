# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

class GetRestaurantMenuDeliverooWorker
  include Sidekiq::Worker

  def perform(link, restaurant_slug)
    GetRestaurantMenuDeliverooService.call(link, restaurant_slug)
  end
end
