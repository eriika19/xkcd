import React from 'react';
import renderer from 'react-test-renderer';
import { Navbar } from '../../PageTab/__tests__/node_modules/components';

describe('Navbar', () => {
  const navbarElement = renderer.create(<Navbar />).toJSON();

  it('Renders Navbar', () => {
    expect(navbarElement).toMatchSnapshot();
  });
});
