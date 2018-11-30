# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Scraps
  class RestaurantNameRestopolitain
    class << self
      def get_name
        pages = (1..43)
        pages.each do |page|
          p "Page #{page} - " * 20
          html_doc = initialize_crawl(page)
          html_doc.search('.country__cities').each do |element|
            links = element.css('a')
            links.each do |restaurant|
              link = restaurant['href']
              name = restaurant.text
              restaurant = create_restaurant(name)
              next if restaurant.id.nil?

              Scraps::MenuRestaurantRestopolitain.get_menu(link, restaurant.id)
            end
          end
        end
      end

      private

      def initialize_crawl(page)
        url = "https://www.restopolitan.com/tous-nos-restaurants/page/#{page}"
        p url
        sleep 5
        html_file = open(url).read
        Nokogiri::HTML(html_file)
      end

      def create_restaurant(name)
        restaurant = Restaurant.create(name: name,
                                       slug: name.parameterize,
                                       source: 'restopolitain')
      end
    end
  end
end
