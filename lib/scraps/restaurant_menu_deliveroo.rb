require 'open-uri'
require 'nokogiri'

module Scraps
  class RestaurantMenuDeliveroo
    class << self
      def get_menu(link, restaurant)
        html_file = open(link).read
        html_doc = Nokogiri::HTML(html_file)
        address = html_doc.css('.address').text
        restaurant.update(address: address)
        html_doc.css(".menu-index-page__item-content").each do |element|
          restaurant_menu = RestaurantMenu.create(restaurant: restaurant)
          element.search('.menu-index-page__item-title').each do |a|
            dish_name = a.text
            dish_price = element.css(".menu-index-page__item-price").text
            Dish.create(title: dish_name, restaurant_menu_id: restaurant_menu.id)
            p dish_name
            p dish_price
            p '---'*20
          end
        end
      end
    end
  end
end
