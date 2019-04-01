import React from 'react';
import { shallow } from 'enzyme';

import Games from './Games.js';

describe('Games', () => {

  it('should render correctly', () => {
    const component = shallow(<Games />);
    expect(component).toMatchSnapshot();
  });

});
