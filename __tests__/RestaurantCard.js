import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

Enzyme.configure({ adapter: new Adapter() });
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme';
import { deleteFavorite } from '../app/javascript/apis/Favorite';

import RestaurantCard from '../app/javascript/components/RestaurantCard';

describe('<Restaurant />', () => {

  beforeEach(() => {
    const mockSuccessResponse = { };
    const mockJsonPromise = Promise.resolve({userId: 1});
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
  });

  it('display restaurant information', () => {
    const wrapper = shallow(<RestaurantCard response={ { city: " paris  ", dishes_count: 73, full_address: "3 Rue Moret, 75011  paris",
      name: "Africa Délices", street: "3 Rue Moret", tags: ["Africain", "Halal"] }} />);
    expect(wrapper.exists('.trash-favorite')).toEqual(false);
    expect(wrapper.find('.restaurant-name').text()).toEqual('Africa Délices');
    expect(wrapper.find('.restaurant-informations span').first().text()).toEqual('3 Rue Moret, 75011  paris');
    expect(wrapper.find('.restaurant-informations span').last().text()).toEqual('73');
    expect(wrapper.find('.badge').first().text()).toEqual('Africain');
  });

  it('display trash icon if the card it rendered in Favorite page', () => {
    const baseProps = {
      handleDelete: deleteFavorite,
      response: {city: " paris  ", dishes_count: 73, full_address: "3 Rue Moret, 75011  paris",
        name: "Africa Délices", street: "3 Rue Moret", tags: ["Africain", "Halal"] },
      fromFavorite: true
    };
    const wrapper = shallow(<RestaurantCard {...baseProps}/>);

    wrapper.find(".trash-favorite").at(0).simulate("click");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/private/undefined/favorite/undefined',
      {"headers": {"Accept": "application/json", "Content-Type": "application/json"}, "method": "DELETE"});
  });
});
