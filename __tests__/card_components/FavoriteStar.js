import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

Enzyme.configure({ adapter: new Adapter() });
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme';

import FavoriteStar from '../../app/javascript/components/card_components/FavoriteStar';

beforeEach(() => {
  const mockSuccessResponse = { };
  const mockJsonPromise = Promise.resolve();
  const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
});

describe('<Comments />', () => {
  it('colorize or not icon according to the restaurant is already added to favorite', () => {
    const wrapper = shallow(<FavoriteStar isFavorite={false}/>);
    expect(wrapper.exists('.already-favorite')).toEqual(false);
    wrapper.setState({ isFavorite: true });
    expect(wrapper.exists('.already-favorite')).toEqual(true);
  });


  it('on click the favorite state is true', () => {
    const wrapper = shallow(<FavoriteStar isFavorite={false}/>);
    expect(wrapper.exists('.already-favorite')).toEqual(false);
    wrapper
    .find(".star")
    .at(0)
    .simulate("click");

    expect(wrapper.exists('.already-favorite')).toEqual(true);
  });


  it('on click the restaurant is added to favorite', () => {
    const wrapper = shallow(<FavoriteStar isFavorite={true}/>);

    wrapper
    .find(".star")
    .at(0)
    .simulate("click");

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('undefined/favorite', {"body": "{\"favorite\":{}}", "headers": {"Content-Type": "application/json"}, "method": "POST"});
    expect(wrapper.exists('.already-favorite')).toEqual(true);
  });
});
