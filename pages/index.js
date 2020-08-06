import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLastComic, addComic, deleteComic } from 'actions';
import { getComicData } from 'selectors';
import { ComicCard, Pagination } from 'components';

const Home = () => {
  const dispatch = useDispatch();
  const comicData = useSelector(getComicData);

  /*
   * Use 'useEffect' to get most recent comic data
   */
  useEffect(() => {
    dispatch(getLastComic());
  }, []);

  const toggleFavItem = deleteItem => {
    deleteItem ? dispatch(deleteComic(comicData)) : dispatch(addComic(comicData));
  };

  return (
    <main className='container'>
      <ComicCard comicData={comicData} toogleFavItem={toggleFavItem} />
      <Pagination />
    </main>
  );
};

export default Home;
