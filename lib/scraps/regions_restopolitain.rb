require 'open-uri'
require 'nokogiri'

module Scraps
  class RegionsRestopolitain
    class << self
      def get_region
        initialize_crawl.css('#regions > a').each do |element|
          region_link = element.values.last
          sleep 2
          Scraps::RestaurantRestopolitain.get_restaurant(region_link)
        end
      end

      private

      def initialize_crawl
        url = "https://www.restopolitan.com/restaurants-france/index.html"
        html_file = open(url).read
        html_doc = Nokogiri::HTML(html_file)
      end
    end
  end
end
