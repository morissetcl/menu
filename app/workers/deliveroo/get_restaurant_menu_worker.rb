# frozen_string_literal: true

require 'open-uri'
require 'nokogiri'

module Deliveroo
  class GetRestaurantMenuWorker
    include Sidekiq::Worker

    def perform(link, restaurant_slug)
      restautant_without_dishes = Restaurant.left_joins(:dishes)
                                            .merge(Dish.where(id: nil))
                                            .pluck(:slug)
      return if restautant_without_dishes.include?(restaurant_slug)

      Deliveroo::GetRestaurantMenuService.call(link, restaurant_slug)
    end
  end
end
