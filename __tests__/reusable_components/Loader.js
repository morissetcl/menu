import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme';

import Loader from '../../app/javascript/components/reusable_components/Loader';

describe('<Loader />', () => {
  it('render loader', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.find('.circle-clipper')).toHaveLength(2)
    expect(wrapper.find('.circle')).toHaveLength(3)
  });
});
