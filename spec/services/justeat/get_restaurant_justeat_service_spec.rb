# frozen_string_literal: true

require 'rails_helper'
require 'sidekiq/testing'

describe GetRestaurantJusteatService do
  ActiveJob::Base.queue_adapter = :test
  Sidekiq::Testing.fake!

  let(:url) { "#{Rails.root}/spec/support/files/response_restaurant_justeat.html" }
  let(:reponse_body) { File.open(url).read }

  let(:stub_restaurant_justeat) do
    stub_request(:get, 'https://www.just-eat.fr/livraison/paris/paris/?page=19')
      .to_return(status: 200, body: reponse_body, headers: {})
  end

  before do
    stub_restaurant_justeat
  end

  it 'Create a new restaurant and launch new worker' do
    expect do
      GetRestaurantJusteatService.call(19)
    end.to change { Restaurant.count }
  end
end