# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Foodin
  class GetRestaurantMenuWorker
    include Sidekiq::Worker

    def perform(link, restaurant_id)
      restautant_without_dishes = Restaurant.left_joins(:dishes).merge(Dish.where(id: nil)).ids
      return if restautant_without_dishes.include?(restaurant_id)
      
      Foodin::GetRestaurantMenuFoodinService.call(link, restaurant_id)
    end
  end
end
