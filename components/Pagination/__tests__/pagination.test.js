import React from 'react';
import * as ReactReduxHooks from 'react-redux';
import configureStore from 'redux-mock-store';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { renderWithProvider, renderWithProviderSnapshot } from 'jest-utils';
import { Pagination } from 'components';

const dispatch = jest.fn();
jest.spyOn(ReactReduxHooks, 'useDispatch').mockImplementation(() => dispatch);

const mockStore = configureStore([]);

describe('Pagination', () => {
  it('Renders Pagination ', () => {
    const paginationElement = renderWithProviderSnapshot(<Pagination />, {
      mockStore,
    }).toJSON();
    expect(paginationElement).toMatchSnapshot();
  });

  it('Call dispatch on "prev" and "next" buttons', async () => {
    const { getByTitle } = renderWithProvider(<Pagination />, {
      mockStore,
    });
    const nextButton = getByTitle('next');
    const prevButton = getByTitle('prev');
    await act(async () => {
      fireEvent.click(nextButton);
      fireEvent.click(prevButton);
    });
    expect(dispatch).toBeCalledTimes(2);
  });
});
