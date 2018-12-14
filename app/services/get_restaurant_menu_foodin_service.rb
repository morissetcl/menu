# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

class GetRestaurantMenuFoodinService
  class << self
    def call(link, restaurant_id)
      html_doc = fetch_html(link)
      restaurant_menu = RestaurantMenu.create(restaurant_id: restaurant_id)
      restaurant = add_address_to_restaurant(html_doc, restaurant_id)
      html_doc.css('.block-regie-plat').each do |restaurant|
        create_dish(html_doc, restaurant, restaurant_menu)
      end
    end

    def fetch_html(link)
      url = "https://foodin.fr#{link}"
      html_file = URI.parse(url).open
      Nokogiri::HTML(html_file)
    end

    def add_address_to_restaurant(html_doc, restaurant_id)
      restaurant = Restaurant.find restaurant_id
      address = html_doc.css('.text-adr').first.text
      restaurant.update(address: address.strip)
    end

    def create_dish(html_doc, restaurant, restaurant_menu)
      title = restaurant.css('.title-cart-block').text.strip
      description = restaurant.css('.discription-cart-block').text.strip
      price = restaurant.css('.price-plat').text.strip
      Dish.create(title: title, description: description, restaurant_menu: restaurant_menu, price: price)
    end
  end
end
