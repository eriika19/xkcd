import React from 'react';
import { PageTab } from 'components';
import HeadManager from 'next/dist/client/head-manager';
import { HeadManagerContext } from 'next/dist/next-server/lib/head-manager-context';
import { render, waitFor } from '@testing-library/react';

describe('PageTab', () => {
  it('Should change the document title from the page tab', async () => {
    const headManager = new HeadManager();
    const meta = document.createElement('meta');
    meta.name = 'next-head-count';
    document.head.appendChild(meta);
    render(
      <HeadManagerContext.Provider value={headManager.updateHead}>
        <PageTab title='Home' favico='/favicon.ico' />
      </HeadManagerContext.Provider>,
    );

    await waitFor(() => expect(document.title).toEqual('Home'));
  });
});
