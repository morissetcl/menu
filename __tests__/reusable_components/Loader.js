import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

Enzyme.configure({ adapter: new Adapter() });
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
