import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

Enzyme.configure({ adapter: new Adapter() });
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme';

import PrivateNavbar from '../../app/javascript/components/navigation/PrivateNavbar';
import { Link } from "react-router-dom";

describe('<PrivateNavbar />', () => {
  it('render the correct number of Link and the first one is activated', () => {
    const wrapper = shallow(<PrivateNavbar />);
    expect(wrapper.find(Link)).toHaveLength(3);
    expect(wrapper.find('.active-link')).toHaveLength(1)
  });
});
