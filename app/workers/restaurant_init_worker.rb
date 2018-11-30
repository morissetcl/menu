# frozen_string_literal: true

class RestaurantInitWorker
  include Sidekiq::Worker

  def perform(*args)
    p 'coucou'
    GetRestaurantDeliverooWorker.perform_async(*args)
  end
end
