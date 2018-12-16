# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

class GetDishesJusteatService
  class << self
    def call(html_doc, restaurant_menu)
      get_food_tags(html_doc, restaurant_menu)
      create_dishes(html_doc, restaurant_menu)
    end

    def create_dishes(html_doc, restaurant_menu)
      html_doc.css('.product').each do |element|
        title = element.css('h4').text.strip
        price = element.css('.price').text
        description = element.css('.description').text
        Dish.create!(title: title, restaurant_menu_id: restaurant_menu.id,
                     price: price, description: description)
      end
    end

    def get_food_tags(html_doc, restaurant_menu)
      tags = html_doc.css('.cuisines')
      food_type = []
      tags.css('li').each do |food|
        food_type << food.text
      end
      restaurant = Restaurant.find restaurant_menu.restaurant.id
      restaurant.update!(tags: food_type.join(','))
      FormatAddressesService.call(restaurant)
    end
  end
end
