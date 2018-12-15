require 'rails_helper'

describe 'Restaurant', type: :integration do
  ActiveJob::Base.queue_adapter = :test

  let!(:restaurant_justeat) { create :restaurant, name: "El Rancho #{rand(8)}",
                                          slug: "el-rancho #{rand(8)}",
                                          address: '1 Avenue Gabriel Péri, MONTREUIL 93100' }

  context "With an address from Justeat" do
    it 'Fill address columns cleanly' do
      expect(restaurant_justeat.city).to eq 'Montreuil'
      expect(restaurant_justeat.zip_code).to eq 93100
      expect(restrestaurant_justeataurant.street).to eq '1 Avenue Gabriel Péri'
    end
  end
end
