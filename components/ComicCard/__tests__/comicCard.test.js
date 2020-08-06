import React from 'react';
import configureStore from 'redux-mock-store';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { renderWithProvider, renderWithProviderSnapshot } from 'jest-utils';
import { comicData } from 'jest-factories';
import { ComicCard } from 'components';

const mockStore = configureStore([]);

const toogleFavItem = jest.fn().mockImplementation(props => {
  return props ? 'delete' : 'add';
});

const comicCardElement = <ComicCard comicData={comicData} toogleFavItem={toogleFavItem} />;

describe('ComicCard', () => {
  it('Renders ComicCard ', () => {
    const comicCard = renderWithProviderSnapshot(comicCardElement, {
      mockStore,
    }).toJSON();
    expect(comicCard).toMatchSnapshot();
  });

  it('Call Toogle function with button card', async () => {
    const storeWithFav = mockStore({
      favorites: [comicData],
    });

    const { getByText } = renderWithProvider(comicCardElement, {
      storeWithFav,
    });
    const cardButton = getByText('Agregar a Favoritos ❤');
    expect(cardButton).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(cardButton);
    });
    expect(toogleFavItem).toBeCalled();
  });
});
