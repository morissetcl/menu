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

  it('render the correct number of Link and the first one is activated', () => {
    const wrapper = shallow(<PrivateNavbar userId={2}/>);
    wrapper.setProps({ activeFavorite: true,  activeDashboard: false, activeCalendar: false });
    expect(wrapper.find(Link)).toHaveLength(3);
    expect(wrapper.find(Link).first().props().to).toBe('/private/2/dashboard');
    expect(wrapper.find(Link).last().props().to).toBe('/private/2/calendar');
    expect(wrapper.find('.active-link')).toHaveLength(1)
  });

  it('active calendar link', () => {
    const wrapper = shallow(<PrivateNavbar userId={2}/>);
    wrapper
    .find(Link)
    .last()
    .simulate("click");

    expect(wrapper.state().activeCalendar).toEqual(true)
  });

  it('active favorite link', () => {
    const wrapper = shallow(<PrivateNavbar userId={2}/>);
    wrapper
    .find(Link)
    .at(1)
    .simulate("click");

    expect(wrapper.state().activeFavorite).toEqual(true)
  });

  it('active dashboard link', () => {
    const wrapper = shallow(<PrivateNavbar userId={2}/>);
    wrapper
    .find(Link)
    .first()
    .simulate("click");

    expect(wrapper.state().activeDashboard).toEqual(true)
  });
});
