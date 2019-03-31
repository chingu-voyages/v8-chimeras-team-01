import React from 'react';
import { shallow } from 'enzyme';

import Instructions from './Instructions.js';

describe('Instructions', () => {

  it('should render correctly', () => {
    const component = shallow(<Instructions />);
    expect(component).toMatchSnapshot();
  });

});
