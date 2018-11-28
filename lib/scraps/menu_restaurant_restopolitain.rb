require 'open-uri'
require 'nokogiri'
require 'mechanize'

module Scraps
  class MenuRestaurantRestopolitain
    class << self
      def get_menu(link, restaurant_id)
        @menu = RestaurantMenu.create!(restaurant_id: restaurant_id)
        get_menu_data(link).search('.catalog__item > span:first').each do |dish|
          next if dish.text.include?('/')
          create_dish(@menu, dish)
        end
        address = get_menu_data(link).css('.restaurant__info > p:first > span').text
        p address
        get_address(address)
      end

      private

      def get_link(link)
        if link.include?('https')
          link
        else
          "https://www.restopolitan.com#{link}"
        end
      end

      def get_menu_data(link)
        url = get_link(link)
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
