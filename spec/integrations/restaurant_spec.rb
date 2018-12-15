require 'rails_helper'

describe 'Restaurant', type: :integration do
  let!(:restaurant_justeat) { create :restaurant, name: "El Rancho #{rand(8)}",
                                          slug: "el-rancho #{rand(8)}",
                                          address: '1 Avenue Gabriel Péri, MONTREUIL 93100',
                                          source: 'deliveroo' }
  let!(:restaurant_deliveroo) { create :restaurant, name: "El Paco #{rand(8)}",
                                          slug: "el-paco #{rand(8)}",
                                          address: '1 impasse de la Gaité, Paris, 75014',
                                          source: 'deliveroo' }

  context "With an address from Justeat" do
    it 'Fill address columns cleanly' do
      expect(restaurant_justeat.city).to eq 'Montreuil'
      expect(restaurant_justeat.zip_code).to eq 93100
      expect(restaurant_justeat.street).to eq '1 Avenue Gabriel Péri'
    end
  end

  context "With an address from Deliveroo" do
    it 'Fill address columns cleanly' do
      expect(restaurant_deliveroo.zip_code).to eq 75014
      expect(restaurant_deliveroo.street).to eq '1 impasse de la Gaité'
      expect(restaurant_deliveroo.city).to eq 'Paris'
    end
  end
end
