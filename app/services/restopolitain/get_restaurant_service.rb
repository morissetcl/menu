# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Restopolitain
  class GetRestaurantService
    class << self
      attr_reader :link, :name

      def call(page)
        html_doc = initialize_crawl(page)
        html_doc.search('.country__cities').each do |element|
          links = element.css('a')
          links.each do |restaurant|
            sleep 5
            get_link_and_name(restaurant)
            restaurant = create_restaurant(name)
            next if restaurant.id.nil?
            Restopolitain::GetRestaurantMenuWorker.perform_async(link, restaurant.id)
          end
        end
      end

      private

      def initialize_crawl(page)
        url = "https://www.restopolitan.com/tous-nos-restaurants/page/#{page}"
        html_file = URI.parse(url).open
        Nokogiri::HTML(html_file)
      end

      def create_restaurant(name)
        Restaurant.create(name: name,
                          slug: name.parameterize,
                          source: 'restopolitain')
      end

      def get_link_and_name(restaurant)
        @link = restaurant['href']
        @name = restaurant.text
      end
    end
  end
end
