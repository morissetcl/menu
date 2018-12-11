# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Justeat
  class GetRestaurantMenuWorker
    include Sidekiq::Worker

    def perform(link, restaurant_slug)
      GetRestaurantMenuJusteatService.call(link, restaurant_slug)
    end
  end
end
