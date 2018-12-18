# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Restovisio
  class GetRestaurantService
    class << self
      def call(page)
        html_doc = fetch_html(page)
        create_restaurant(html_doc)
      end

      private

      def fetch_html(page)
        url = "http://www.restovisio.com/restaurants/#{page}.htm"
        sleep 5
        html_file = URI.parse(url).open
        Nokogiri::HTML(html_file)
      end

      def create_restaurant(html_doc)
        html_doc.css('.item_infos').each do |restaurant|
          name = restaurant.css('a').first.text.strip
          tags = restaurant.css('.etb_cat_amb').text.strip
          price = restaurant.css('.etb_price_range').text.strip
          get_link(restaurant)
          resto = Restaurant.create!(name: name, slug: name.parameterize, tags: tags, price_range: price, source: 'restovisio')
          add_address_to_restaurant(html_doc, resto)
          Restovisio::GetRestaurantMenuWorker.perform_async(@link, resto.id)
        end
      end

      def add_address_to_restaurant(html_doc, restaurant)
        address = html_doc.css('.etb_location_info').first.text
        restaurant.update(address: address.strip)
        FormatAddressesService.call(restaurant)
      end

      def get_link(restaurant)
        restaurant.css('a:first').each do |link|
          link = link['href']
          @link = "#{link.chomp("#bookings").chomp("#mobile")}#menu"
        end
      end
    end
  end
end
