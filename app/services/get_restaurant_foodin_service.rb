# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

class GetRestaurantFoodinService
  class << self
    def call(city)
      html_doc = fetch_html(city)
      restaurant = create_restaurant(html_doc)
      Foodin::GetRestaurantMenuWorker.perform_async(@link, restaurant)
    end

    private

    def fetch_html(city)
      url = "https://foodin.fr/nos-restaurants/#{city}"
      sleep 5
      html_file = URI.parse(url).open
      Nokogiri::HTML(html_file)
    end

    def create_restaurant(html_doc)
      html_doc.css('.panel-default').each do |restaurant|
        name = restaurant.css('.name-restaurant-value').text
        tags = restaurant.css('.speciality').text
        get_link(restaurant)
        Restaurant.create(name: name, slug: name.parameterize, tags: tags, source: 'foodin')
      end
    end

    def get_link(restaurant)
      restaurant.css('a:first').each do |link|
        @link = link['href']
      end
    end
  end
end
