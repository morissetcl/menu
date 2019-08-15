import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

Enzyme.configure({ adapter: new Adapter() });
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme';

import Favorite from '../app/javascript/components/Favorite';

describe('<Favorite />', () => {
  let wrapper;

  beforeEach(() => {
    const mockSuccessResponse = { };
    const mockJsonPromise = Promise.resolve([{0: { name:'El Ganso', city: 'Toronto'} }]);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
  });

  it('display restaurant information', done => {
    const wrapper = shallow(<Favorite match={{ params: { userId: '1' }}}/>);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/private/1/favorite.json');
    process.nextTick(() => { // 6
      const restaurant = wrapper.state().favoriteResults[0][0];
      expect(wrapper.state().loaded).toEqual(true);
      expect(restaurant.name).toEqual('El Ganso');
      expect(restaurant.city).toEqual('Toronto');
      done(); // 8
    });
  });
});
