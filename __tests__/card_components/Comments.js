import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme';

import Comments from '../../app/javascript/components/card_components/Comments';

describe('<Comments />', () => {
  let wrapper;

  beforeEach(() => {
    const mockSuccessResponse = { };
    const mockJsonPromise = Promise.resolve();
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    wrapper = shallow(<Comments userId={1} restaurantId={10} commentsResults={[]}/>);
  });

  it('render a formated date', () => {
    const instance = wrapper.instance();
    const date = new Date(1565528113067);
    expect(instance.formatedDate(date)).toEqual('8/11/2019')
    expect(wrapper.find('.super').length).toEqual(1);
  });

  it('display a custom message if there is no comment', () => {
    expect(wrapper.exists('.empty-comment')).toEqual(true);
    expect(wrapper.find('.empty-comment p').text()).toEqual("Oups, littéralement rien à déclarer pour l'instant");
    wrapper.setState({ commentsResults: [{ 0: { body: 'Go away' } }] });
    expect(wrapper.exists('.empty-comment')).toEqual(false);
  });

  it('fetch comment', () => {
    wrapper
    .find(".super")
    .at(0)
    .simulate("click");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/private/1/restaurant/10/comments');

    wrapper.setState({ commentsResults: [{ body: 'Go away' }] });
    expect(wrapper.find('.comment-body')).toHaveLength(1);
    expect(wrapper.find('.comment-body').text()).toEqual('Go away');
  });
});
