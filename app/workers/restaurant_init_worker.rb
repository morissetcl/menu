# frozen_string_literal: true

class RestaurantInitWorker
  include Sidekiq::Worker

  def perform(*args)
    Foodin::GetRestaurantWorker.perform_async(*args)
    Deliveroo::GetRestaurantWorker.perform_async(*args)
    Restopolitain::GetRestaurantWorker.perform_async(*args)
    Justeat::GetRestaurantWorker.perform_async(*args)
    Glovo::GetRestaurantWorker.perform_async(*args)
  end
end
