import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

Enzyme.configure({ adapter: new Adapter() });
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme';

import Comments from '../../app/javascript/components/card_components/Comments';

describe('<Comments />', () => {
  it('render a formated date', () => {
    const wrapper = shallow(<Comments />);
    const instance = wrapper.instance();
    const date = new Date(1565528113067);
    expect(instance.formatedDate(date)).toEqual('8/11/2019')
  });

  it('display a custom message if there is no comment', () => {
    const wrapper = shallow(<Comments commentsResults={[]}/>);
    expect(wrapper.exists('.empty-comment')).toEqual(true);
    expect(wrapper.find('.empty-comment p').text()).toEqual("Oups, littéralement rien à déclarer pour l'instant");
    wrapper.setState({ commentsResults: [{ 0: { body: 'Go away' } }] });
    expect(wrapper.exists('.empty-comment')).toEqual(false);
  });
});
