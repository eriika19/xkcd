import React from 'react';
import configureStore from 'redux-mock-store';
import { renderWithProviderSnapshot } from 'jest-utils';
import { Pagination } from 'components';

const mockStore = configureStore([]);

describe('Pagination', () => {
  const paginationElement = renderWithProviderSnapshot(<Pagination />, { mockStore }).toJSON();

  it('Renders Pagination', () => {
    expect(paginationElement).toMatchSnapshot();
  });
});
