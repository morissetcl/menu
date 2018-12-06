require 'rails_helper'
require 'sidekiq/testing'

describe GetRestaurantDeliverooService do
  ActiveJob::Base.queue_adapter = :test
  Sidekiq::Testing.fake!

  before(:each) do
    @doc = Nokogiri::HTML(open(Rails.root + 'spec/support/files/response_deliveroo.html'))
  end

  it 'pour un artisan dont la source du changement est phelps' do
    expect do
      GetRestaurantDeliverooService.call(@doc)
    end.to change{ Restaurant.count }
       .and change(GetRestaurantMenuDeliverooWorker.jobs, :size).by(1)
  end
end
