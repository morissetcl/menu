# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Justeat
  class GetRestaurantWorker
    include Sidekiq::Worker

    def perform(*_args)
      pages = (1..19)
      pages.each do |page|
        p page
        GetRestaurantJusteatService.call(page)
        sleep 5
      end
    end
  end
end
