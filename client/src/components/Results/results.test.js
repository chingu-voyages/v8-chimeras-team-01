import React from 'react';
import { shallow } from 'enzyme';

import Results from './Results.js';

describe('Results', () => {

  it('should render correctly', () => {
    const component = shallow(<Results />);
    expect(component).toMatchSnapshot();
  });

});
