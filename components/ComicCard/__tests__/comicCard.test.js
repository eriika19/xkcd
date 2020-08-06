import React from 'react';
import configureStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react';

import { renderWithProvider, renderWithProviderSnapshot } from 'jest-utils';
import { comicData } from 'jest-factories';
import { ComicCard } from 'components';

const mockStore = configureStore([]);

describe('ComicCard', () => {
  const store = mockStore({
    favorites: [],
  });

  const storeWithFav = mockStore({
    favorites: [comicData],
  });

  const toogleFavItem = jest.fn().mockImplementation(props => {
    return props ? 'delete' : 'add';
  });

  const comicCardElement = <ComicCard comicData={comicData} toogleFavItem={toogleFavItem} />;

  it('Renders ComicCard ', () => {
    const comicCard = renderWithProviderSnapshot(comicCardElement, {
      mockStore,
    }).toJSON();
    expect(comicCard).toMatchSnapshot();
  });

  it('Renders ComicCard with the add to favorites option', () => {
    const { getByText } = renderWithProvider(comicCardElement, {
      mockStore,
    });
    const button = getByText('Agregar a Favoritos ❤');
    expect(button).toBeInTheDocument();
  });

  it('Renders ComicCard with the delete from favorites option', () => {
    const { getByText } = renderWithProvider(comicCardElement, {
      storeWithFav,
    });
    const button = getByText('Agregar a Favoritos ❤');
    expect(button).toBeInTheDocument();
  });
});
