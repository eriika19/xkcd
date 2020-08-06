import React from 'react';
import configureStore from 'redux-mock-store';
import { renderWithProviderSnapshot } from 'jest-utils';
import { NavbarInput } from 'components';

const mockStore = configureStore([]);

describe('NavbarInput', () => {
  const navbarInputElement = renderWithProviderSnapshot(<NavbarInput />, { mockStore }).toJSON();

  it('Renders NavbarInput', () => {
    expect(navbarInputElement).toMatchSnapshot();
  });
});
