# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Deliveroo
  class GetRestaurantWorker
    include Sidekiq::Worker

    def perform(*_args)
      DISTRICTS.each do |district|
        html_doc = fetch_html(district)
        p html_doc
        GetRestaurantDeliverooService.call(html_doc)
      end
    end

    private

    def fetch_html(district)
      p 'lolo'
      url = "https://deliveroo.fr/fr/restaurants/paris/#{district}"
      sleep 5
      html_file = open(url).read
      Nokogiri::HTML(html_file)
    end
  end
end
