# frozen_string_literal: true

require 'rails_helper'

describe 'Comments' do
  describe 'GET comments' do
    let!(:user) { create :user }
    let!(:restaurant) do
      create :restaurant, name: 'Burger Factory', slug: 'burger-factory', city: 'Paris'
    end
    let!(:comment) { create :comment, restaurant: restaurant, user: user, body: 'Hmm yummy !' }

    before(:each) do
      get "/private/#{user.id}/restaurant/#{restaurant.id}/comments.json"
      @json = JSON.parse(response.body).first
    end

    it do
      expect(@json['body']).to eq 'Hmm yummy !'
      expect(@json['restaurant_id']).to eq restaurant.id
      expect(@json['user_id']).to eq user.id
    end
  end
end
