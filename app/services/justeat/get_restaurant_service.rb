# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Justeat
  class GetRestaurantService
    attr_reader :name, :link, :address

    class << self
      def call(page)
        link = "https://www.just-eat.fr/livraison/paris/paris/?page=#{page}"
        html_file = URI.parse(link).open
        html_doc = Nokogiri::HTML(html_file)
        html_doc.css('.restaurantDetails').each do |element|
          get_link_and_name(element)
          restaurant_created = Restaurant.create(name: @name, slug: @name.parameterize,
                                                 address: @address, source: 'justeat')

          next if restaurant_created.id.nil?

          Justeat::GetRestaurantMenuWorker.perform_async(@link, @name.parameterize)
        end
      end

      def get_link_and_name(element)
        @name = element.css('h3').text
        links = element.css('a')
        links.each do |restaurant|
          @link = restaurant['href']
        end
        @address = element.css('address').text
      end
    end
  end
end
