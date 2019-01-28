# frozen_string_literal: true

module Glovo
  class GetRestaurantMenuGlovoService
    class << self
      def call(restaurant_id, link)
        sleep 2 unless Rails.env.test?
        restaurant = Restaurant.find restaurant_id
        html_doc = fetch_html(link)
        restaurant_menu = create_restaurant_menu(restaurant)
        create_dishes(html_doc, restaurant_menu)
      end

      private

      def fetch_html(link)
        url = "https://glovoapp.com#{link}"
        html_file = URI.parse(url).open
        Nokogiri::HTML(html_file)
      end

      def create_restaurant_menu(restaurant)
        RestaurantMenu.create(restaurant: restaurant)
      end

      def create_dishes(html_doc, restaurant_menu)
        html_doc.css('.collection-item').each do |element|
          title = element.css('.title').text.strip
          price = element.css('.price').text.strip
          Dish.create(title: title, restaurant_menu_id: restaurant_menu.id, price: price)
        end
      end
    end
  end
end
