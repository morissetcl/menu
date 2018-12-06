# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

class GetRestaurantMenuDeliverooService
  class << self

    def call(link, restaurant_slug)
      sleep 2 unless Rails.env.test?
      restaurant = Restaurant.find_by(slug: restaurant_slug)
      html_file = open(link).read
      html_doc = Nokogiri::HTML(html_file)
      address = html_doc.css('.address').text
      restaurant.update(address: address)
      restaurant_menu = RestaurantMenu.create(restaurant: restaurant)

      html_doc.css('.menu-index-page__item-content').each do |element|
        element.search('.menu-index-page__item-title').each do |a|
          dish_name = a.text
          dish_price = element.css('.menu-index-page__item-price').text
          Dish.create(title: dish_name, restaurant_menu_id: restaurant_menu.id)
        end
      end
    end

  end
end
