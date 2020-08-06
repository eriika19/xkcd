import React from 'react';
import configureStore from 'redux-mock-store';

import { renderWithProviderSnapshot } from 'jest-utils';
import Favorites from '../favorites';

const mockStore = configureStore([]);

describe('Favorites', () => {
  it('Renders Favorites page', () => {
    const favoritesElement = renderWithProviderSnapshot(<Favorites />, { mockStore }).toJSON();
    expect(favoritesElement).toMatchSnapshot();
  });
});
