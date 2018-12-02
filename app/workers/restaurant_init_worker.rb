# frozen_string_literal: true

class RestaurantInitWorker
  include Sidekiq::Worker

  def perform(*args)
    GetRestaurantDeliverooWorker.perform_async(*args)
    GetRestaurantRestopolitainWorker.perform_async(*args)
  end
end
