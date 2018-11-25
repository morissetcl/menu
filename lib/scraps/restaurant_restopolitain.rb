require 'open-uri'
require 'nokogiri'

module Scraps
  class RestaurantRestopolitain
    class << self
      def get_restaurant(region_link)
        pages = (1..16)
        pages.each do |page|
          html_doc = initialize_crawl(page, region_link)
          html_doc.search('.card__content').each do |element|
            restaurant = create_restaurant(element)
            next if restaurant.id.nil?

            get_restaurant_menu(element, restaurant)
          end
        end
      end

      private

      def initialize_crawl(page, region_link)
        url = "https://www.restopolitan.com#{region_link}#page=#{page}&pmin=0&pmax=100"
        p url
        sleep 5
        html_file = open(url).read
        Nokogiri::HTML(html_file)
      end

      def create_restaurant(element)
        restaurant_name = element.css('.tt-4').text
        restaurant_range = element.css('.text-right').text
        restaurant = Restaurant.create(name: restaurant_name,
                                       price_range: restaurant_range,
                                       slug: restaurant_name.parameterize)
      end

      def get_restaurant_menu(element, restaurant)
        Scraps::MenuRestaurantRestopolitain.get_menu(element, restaurant.id )
      end
    end
  end
end
