import React from 'react';
import { shallow } from 'enzyme';

import Questions from './Questions.js';

describe('Questions', () => {

  it('should render correctly', () => {
    const component = shallow(<Questions />);
    expect(component).toMatchSnapshot();
  });

});
