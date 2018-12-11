# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

class GetDishesJusteatService
  class << self
    def call(html_doc, restaurant_menu)
      create_dishes(html_doc, restaurant_menu)
    end

    def create_dishes(html_doc, restaurant_menu)
      html_doc.css('.product').each do |element|
        title = element.css('h4').text.strip
        price = element.css('.price').text
        description = element.css('.description').text
        dish = Dish.create!(title: title, restaurant_menu_id: restaurant_menu.id,
                            price: price, description: description)
      end
    end
  end
end
