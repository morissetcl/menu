# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Glovo
  class GetRestaurantMenuWorker
    include Sidekiq::Worker

    def perform(restaurant_id, link)
      restautant_without_dishes = Restaurant.left_joins(:dishes).merge(Dish.where(id: nil)).ids
      return if restautant_without_dishes.include?(restaurant_id)

      Glovo::GetRestaurantMenuGlovoService.call(restaurant_id, link)
    end
  end
end
