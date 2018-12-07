# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

class GetRestaurantRestopolitainWorker
  attr_reader :link, :name

  include Sidekiq::Worker

  def perform(*_args)
    pages = (1..43)
    pages.each do |page|
      p "Page #{page} - " * 20
      html_doc = initialize_crawl(page)
      html_doc.search('.country__cities').each do |element|
        links = element.css('a')
        links.each do |restaurant|
          get_link_and_name(restaurant)
          restaurant = create_restaurant(name)
          next if restaurant.id.nil?

          GetRestaurantMenuRestopolitainWorker.perform_async(link, restaurant.id)
        end
      end
    end
  end

  private

  def initialize_crawl(page)
    url = "https://www.restopolitan.com/tous-nos-restaurants/page/#{page}"
    p url
    sleep 5
    html_file = open(url).read
    Nokogiri::HTML(html_file)
  end

  def create_restaurant(name)
    Restaurant.create(name: name,
                      slug: name.parameterize,
                      source: 'restopolitain')
  end

  def get_link_and_name(restaurant)
    @link = restaurant['href']
    @name = restaurant.text
  end
end
