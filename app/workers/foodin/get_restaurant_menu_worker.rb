# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Foodin
  class GetRestaurantMenuWorker
    include Sidekiq::Worker

    def perform(link, restaurant)
      GetRestaurantMenuFoodinService.call(link, restaurant)
    end
  end
end
