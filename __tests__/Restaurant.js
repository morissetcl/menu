import FormCalendar from '../app/javascript/components/card_components/FormCalendar';
import Actions from '../app/javascript/components/restaurant/Actions';

import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme';

import Restaurant from '../app/javascript/components/Restaurant';

describe('<Restaurant />', () => {
  let wrapper;

  beforeEach(() => {
    const mockSuccessResponse = { };
    const mockJsonPromise = Promise.resolve([{0: { id: '1', name:'El Ganso', city: 'Toronto', booked: true, street: "3 Rue Moret", commented: false, dishes:[{0: { title: "Tapas", price: 3, description: "Guacamole yumm" }}] } }]);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    wrapper = shallow(<Restaurant match={{ params: { id: '1' }}} />);
  });

  it("display restaurant's informations", done => {
    window.$ = jest.fn().mockImplementation(() => {
     return {
        modal: jest.fn(),
        datepicker: jest.fn()
      }

      
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/restaurant/1.json');
    process.nextTick(() => {
      const restaurant = wrapper.state().restaurant[0][0]
      expect(wrapper.state().loaded).toEqual(true);
      expect(restaurant.name).toEqual('El Ganso');
      expect(restaurant.city).toEqual('Toronto');
      expect(restaurant.booked).toEqual(true);
      expect(restaurant.commented).toEqual(false);
      expect(restaurant.street).toEqual("3 Rue Moret");
      done();
    });
  });

  it("display dishes informations", () => {
    wrapper = shallow(<Restaurant match={{ params: { id: '1' }}} />);
    wrapper.setState({ loaded: true, dishes: [ {title: "Tacos", price: 4, description: "Guacamole"} ]});

    expect(wrapper.find('.dish-description').text()).toEqual('Guacamole');
    expect(wrapper.find('.dish-price').text()).toEqual('4');
    expect(wrapper.find('.dish-title').text()).toEqual('Tacos');
  });
});
