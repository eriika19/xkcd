import React from 'react';
import configureStore from 'redux-mock-store';

import { renderWithProviderSnapshot } from 'jest-utils';
import Favorites from '../favorites';

const mockStore = configureStore([]);

describe('Favorites', () => {
  const favoritesElement = renderWithProviderSnapshot(<Favorites />, { mockStore }).toJSON();

  it('Renders Favorites page', () => {
    expect(favoritesElement).toMatchSnapshot();
  });
});
