import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

Enzyme.configure({ adapter: new Adapter() });
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme';

import FavoriteStar from '../../app/javascript/components/card_components/FavoriteStar';

describe('<Comments />', () => {
  it.only('colorize or not icon according to the restaurant is already added to favorite', () => {
    const wrapper = shallow(<FavoriteStar isFavorite={false}/>);
    expect(wrapper.exists('.already-favorite')).toEqual(false);
    wrapper.setState({ isFavorite: true });
    expect(wrapper.exists('.already-favorite')).toEqual(true);
  });
});
