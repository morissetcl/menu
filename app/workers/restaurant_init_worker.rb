# frozen_string_literal: true

class RestaurantInitWorker
  include Sidekiq::Worker

  def perform(*args)
    Deliveroo::GetRestaurantWorker.perform_async(*args)
    GetRestaurantRestopolitainWorker.perform_async(*args)
  end
end
