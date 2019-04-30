import React from 'react';
import { shallow } from 'enzyme';

import Landing from './Landing.js';

describe('Landing', () => {

  it('should render correctly', () => {
    const component = shallow(<Landing />);
    expect(component).toMatchSnapshot();
  });

});
