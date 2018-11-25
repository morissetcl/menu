require 'open-uri'
require 'nokogiri'
require 'mechanize'

module Scraps
  class MenuRestaurantRestopolitain
    class << self
      def get_menu(html_doc, restaurant_id)
        @menu = RestaurantMenu.create!(restaurant_id: restaurant_id)
        get_menu_data(html_doc).search('.catalog__item > span:first').each do |dish|
          next if dish.text.include?('/')
          create_dish(@menu, dish)
        end
        address = get_menu_data(html_doc).css('.restaurant__info > p:first > span').text
        p address
        get_address(address)
      end

      private

      def get_link(html_doc)
        link = html_doc.css('a:first').first['href']
         "https://www.restopolitan.com#{link}"
      end

      def get_menu_data(html_doc)
        url = get_link(html_doc)
        p url
        sleep 5
        html_file = open(url).read
        Nokogiri::HTML(html_file)
      end

      def create_dish(menu, dish)
        Dish.create!(restaurant_menu_id: menu.id, title: dish.text)
      end

      def get_address(address)
        restaurant = @menu.restaurant
        restaurant.update(address: address)
      end
    end
  end
end
