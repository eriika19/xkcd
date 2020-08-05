import React, { useEffect } from 'react';

import { ComicCard, Pagination } from 'components';

const Home = () => {
  /*
   * Use 'useEffect' to get most recent comic data
   */
  // useEffect(() => {
  //   dispatch({ type: GET_BALANCES_LIST });
  // }, []);

  return (
    <main className='container'>
      <ComicCard />
      <Pagination />
    </main>
  );
};

export default Home;
