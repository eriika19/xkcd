import React from 'react';
import configureStore from 'redux-mock-store';
import { renderWithProviderSnapshot } from 'jest-utils';
import Home from '../';

const mockStore = configureStore([]);

describe('Home', () => {
  const homeElement = renderWithProviderSnapshot(<Home />, { mockStore }).toJSON();

  it('Renders Home page', () => {
    expect(homeElement).toMatchSnapshot();
  });
});
