# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Scraps
  class RestaurantNameDeliveroo
    class << self

      def call
        DISTRICTS.each do |district|
          html_doc = fetch_html(district)
          create_restaurant(html_doc)
        end
      end

      private

      def fetch_html(district)
        url = "https://deliveroo.fr/fr/restaurants/paris/#{district}"
        sleep 5
        html_file = open(url).read
        Nokogiri::HTML(html_file)
      end

      def create_restaurant(html_doc)
        html_doc.search('.RestaurantsList-8608590270dc6ae3').each do |element|
          links = element.css('a')
          links.each do |restaurant|
            next if get_data(restaurant).blank?

            restaurant_created = Restaurant.create(name: get_name(get_data(restaurant)),
                                                   slug: get_data(restaurant),
                                                   source: 'deliveroo')
            next if restaurant_created.id.nil?

            GetRestaurantMenuDeliverooWorker.perform_async(restaurant['href'],
                                                           get_data(restaurant))
          end
        end
      end

      def get_data(restaurant)
        link_clean = get_link(restaurant['href'])
        get_slug(link_clean)
      end

      def get_link(link)
        return '' if link.nil?

        link.scan(/(?<=https:\/\/deliveroo.fr\/menu\/paris\/)(.*)(?=\?day=today&time=ASAP)/)
      end

      def get_slug(link)
        link.flatten.join.split('/').last
      end

      def get_name(slug)
        slug.tr('-', ' ').humanize
      end
      
    end
  end
end
