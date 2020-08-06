import React from 'react';
import * as ReactReduxHooks from 'react-redux';
import configureStore from 'redux-mock-store';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { renderWithProvider, renderWithProviderSnapshot } from 'jest-utils';
import { NavbarInput } from 'components';

const dispatch = jest.fn();
jest.spyOn(ReactReduxHooks, 'useDispatch').mockImplementation(() => dispatch);

const mockStore = configureStore([]);

const navbarInputElement = <NavbarInput />;

describe('NavbarInput', () => {
  it('Renders NavbarInput ', () => {
    const navbarInput = renderWithProviderSnapshot(navbarInputElement, {
      mockStore,
    }).toJSON();
    expect(navbarInput).toMatchSnapshot();
  });

  it('Add and remove "is-hidden" class to help text', () => {
    const { getByRole, getByTestId } = renderWithProvider(navbarInputElement, {
      mockStore,
    });
    const input = getByRole('searchbox');
    const help = getByTestId('help');
    input.focus();
    expect(help).not.toHaveClass('is-hidden');
    input.blur();
    expect(help).toHaveClass('is-hidden');
  });

  it('change value input and dispatch value on "Enter"', async () => {
    const { getByRole } = renderWithProvider(navbarInputElement, {
      mockStore,
    });
    const input = getByRole('searchbox');
    fireEvent.change(input, { target: { value: '23' } });
    expect(input.value).toBe('23');
    await act(async () => {
      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
    });
    expect(dispatch).toBeCalledTimes(1);
  });
});
