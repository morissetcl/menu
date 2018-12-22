# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

class GetRestaurantGlovoService
  class << self
    def call(address)
      html_doc = fetch_html(address)
      create_restaurant(html_doc)
    end

    private

    def fetch_html(address)
      html_file = URI.parse(address).open
      Nokogiri::HTML(html_file)
    end

    def create_restaurant(html_doc)
      html_doc.css('.collection-item').each do |restaurant|
        name = restaurant.css('.title').text
        tags = restaurant.css('.description').text
        link = restaurant.first[1]
        restaurant = Restaurant.create(name: name,
                                       slug: name.parameterize,
                                       tags: tags,
                                       source: 'glovo')
        sleep 2 unless Rails.env.test?
        Glovo::GetRestaurantMenuWorker.perform_async(restaurant.id, link)
      end
    end
  end
end
