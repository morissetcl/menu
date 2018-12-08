# frozen_string_literal: true

require 'rails_helper'
require 'sidekiq/testing'

describe GetRestaurantRestopolitainService do
  ActiveJob::Base.queue_adapter = :test
  Sidekiq::Testing.fake!

  let(:reponse_body) {  File.open("#{Rails.root}/spec/support/files/response_restaurant_restopolitain.html").read }

  let(:stub_restaurant_restopolitain) do
    stub_request(:get, 'https://www.restopolitan.com/tous-nos-restaurants/page/1').
                 to_return(status: 200, body: reponse_body, headers: {})
  end
  before do
    stub_restaurant_restopolitain
  end

  it 'Create a new restaurant and launch new worker' do
    expect do
      GetRestaurantRestopolitainService.call(1)
    end.to change { Restaurant.count }.by(60)
  end
end
