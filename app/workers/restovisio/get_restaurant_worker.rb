# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Restovisio
  class GetRestaurantWorker
    include Sidekiq::Worker

    def perform(*_args)
      pages = (1..2)
      pages.each do |page|
        Restovisio::GetRestaurantService.call(page)
      end
    end
  end
end
