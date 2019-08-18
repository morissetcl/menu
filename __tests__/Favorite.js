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
    const mockJsonPromise = Promise.resolve([{0: { name:'El Ganso', city: 'Toronto'} }, {1: { name:'Buffalo Grill', city: 'Toronto'} }]);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
  });

  it('display restaurants informations', done => {
    const wrapper = shallow(<Favorite match={{ params: { userId: '1' }}}/>);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/private/1/favorite.json');
    process.nextTick(() => {
      const restaurant1 = wrapper.state().favoriteResults[0][0];
      const restaurant2 = wrapper.state().favoriteResults[1][1];

      expect(wrapper.state().loaded).toEqual(true);
      expect(restaurant1.name).toEqual('El Ganso');
      expect(restaurant2.name).toEqual('Buffalo Grill');
      expect(restaurant1.city).toEqual('Toronto');
      done();
    });
  });
});
