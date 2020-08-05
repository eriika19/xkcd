import { useSelector } from 'react-redux';

import { getFavoritesData } from 'selectors';
import { ComicCard } from 'components';

const Favorites = () => {
  const favorites = useSelector(getFavoritesData);

  return (
    <main className='container'>
      <h1 className='title'>Favoritos</h1>
      {favorites.map(comic => (
        <ComicCard key={`card-${comic.num}`} comicData={comic} />
      ))}
    </main>
  );
};

export default Favorites;
