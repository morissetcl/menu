import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme';

import FavoriteStar from '../../app/javascript/components/card_components/FavoriteStar';
import AddToAgenda from '../../app/javascript/components/card_components/AddToAgenda';
import Comments from '../../app/javascript/components/card_components/Comments';

import Actions from '../../app/javascript/components/restaurant/Actions';

describe('<Action />', () => {
  it("render restaurant's actions", () => {
    const wrapper = shallow(<Actions restaurant={{ id: 28425, name: "Mukura", street: "82 Rue Rebeval", city: " paris  ", zip_code: 75019 }}/>);
    expect(wrapper.find(FavoriteStar)).toHaveLength(1);
    expect(wrapper.find(AddToAgenda)).toHaveLength(1);
    expect(wrapper.find(Comments)).toHaveLength(1);
  });
});
