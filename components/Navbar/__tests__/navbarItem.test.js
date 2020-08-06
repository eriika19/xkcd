import React from 'react';
import renderer from 'react-test-renderer';
import { NavbarItem } from 'components';

describe('NavbarItem', () => {
  const props = {
    route: '/',
    active_route: '/',
    page: 'home',
  };

  const navbarItemElement = renderer.create(<NavbarItem {...props} />).toJSON();
  it('Renders NavbarItem', () => {
    expect(navbarItemElement).toMatchSnapshot();
  });
});
