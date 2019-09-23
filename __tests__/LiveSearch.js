import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme';

import LiveSearch from '../app/javascript/components/LiveSearch';
import RestaurantCard from '../app/javascript/components/RestaurantCard';

describe('<LiveSearch />', () => {
  let wrapper;

  beforeEach(() => {
    const mockSuccessResponse = { };
    const mockJsonPromise = Promise.resolve({});
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    wrapper = shallow(<LiveSearch match={{ params: { userId: '1' }}} />);
  });

  it('without restaurants', () => {
    expect(wrapper.exists('.recherche-input')).toEqual(true);
    expect(wrapper.find(RestaurantCard)).toHaveLength(0);
  });

  describe('with restaurants', () => {
    beforeEach(() => {
      wrapper.setState({ loaded: true, autoCompleteResults: [{city: "Rouen", name: "Africa Délices", street: "3 Rue Moret", full_address: "3 Rue Moret, 76000 Rouen", tags: ["African", "Halal"] }, {city: "Elbeuf", name: "French Délices", street: "23 Rue Marveille", full_address: "23 Rue Marveille, 76500 Elbeuf", tags: ["French", "Organic"] }] });
    });

    it('render the correct number of RestaurantCard', () => {
      expect(wrapper.exists('.restaurant-wrapper')).toEqual(true);
      expect(wrapper.find(RestaurantCard)).toHaveLength(2);
    });

    it("render the correct restaurant's informations", () => {
      var restaurant = wrapper.find(RestaurantCard).first();
      expect(restaurant.props().response.name).toEqual("Africa Délices");
      expect(restaurant.props().response.full_address).toEqual("3 Rue Moret, 76000 Rouen");
    });
  });
});
