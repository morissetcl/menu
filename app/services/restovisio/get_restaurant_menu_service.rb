# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Restovisio
  class GetRestaurantMenuService
    class << self
      def call(link, restaurant_id)
        html_doc = fetch_html(link)
        restaurant_menu = RestaurantMenu.create(restaurant_id: restaurant_id)
        html_doc.css('.menu_block_content').each do |restaurant|
          create_dish(restaurant, restaurant_menu)
        end
      end

      def fetch_html(link)
        url = "http://www.restovisio.com#{link}#menu"
        html_file = URI.parse(url).open
        Nokogiri::HTML(html_file)
      end

      def create_dish(restaurant, restaurant_menu)
        title = restaurant.css('.menu_title').text.strip
        description = restaurant.css('.menu_desc').text.strip
        price = restaurant.css('.menu_price').text.strip
        Dish.create(title: title,
                    description: description,
                    restaurant_menu: restaurant_menu,
                    price: price)
      end
    end
  end
end
