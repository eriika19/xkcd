import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLastComic } from 'actions';
import { getState, getComicData } from 'selectors';
import { ComicCard, Pagination } from 'components';

const Home = () => {
  const dispatch = useDispatch();

  /*
   * Use 'useEffect' to get most recent comic data
   */
  useEffect(() => {
    dispatch(getLastComic());
  }, []);

  const state = useSelector(getState);
  const comicData = useSelector(getComicData);

  // console.log('====================================');
  // console.log('State from home : ', state);
  // console.log('====================================');

  return (
    <main className='container'>
      <ComicCard comicData={comicData} />
      <Pagination />
    </main>
  );
};

export default Home;
