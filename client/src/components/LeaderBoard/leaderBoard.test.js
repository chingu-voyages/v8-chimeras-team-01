import React from 'react';
import { shallow } from 'enzyme';

import LeaderBoard from './LeaderBoard.js';

describe('LeaderBoard', () => {

  it('should render correctly', () => {
    const component = shallow(<LeaderBoard />);
    expect(component).toMatchSnapshot();
  });

});
