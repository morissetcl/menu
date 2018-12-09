# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Deliveroo
  class GetRestaurantMenuWorker
    include Sidekiq::Worker

    def perform(link, restaurant_slug)
      p 'GetRestaurantMenuDeliverooService'
      GetRestaurantMenuDeliverooService.call(link, restaurant_slug)
    end
  end
end
