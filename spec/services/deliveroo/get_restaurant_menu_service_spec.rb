# frozen_string_literal: true

require 'rails_helper'
require 'sidekiq/testing'

describe GetRestaurantMenuDeliverooService do
  ActiveJob::Base.queue_adapter = :test
  Sidekiq::Testing.fake!

  let(:reponse_body) { File.open("#{Rails.root}/spec/support/files/deliveroo/response.html").read }

  let(:stub_deliveroo) do
    stub_request(:get, 'https://deliveroo.fr/menu/paris/9eme-opera/creperie-21-martorell?day=today&time=ASAP')
      .to_return(status: 200, body: reponse_body, headers: {})
  end

  before do
    stub_deliveroo
  end

  it 'Create a new restaurant_menu and dish' do
    restaurant = Restaurant.create!(name: 'creperie 21 martorell', slug: 'creperie-21-martorell')
    link = 'https://deliveroo.fr/menu/paris/9eme-opera/creperie-21-martorell?day=today&time=ASAP'
    expect do
      GetRestaurantMenuDeliverooService.call(link, restaurant.slug)
    end.to change(RestaurantMenu, :count)
  end
end
