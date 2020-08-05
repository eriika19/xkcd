import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { getStringDate } from 'utils';
import { addComic, deleteComic } from 'actions';
import { getFavoritesData } from 'selectors';

const ComicCard = ({ comicData, add_text, delete_text }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(getFavoritesData);
  const { alt, day, img, month, num, safe_title, transcript, year } = comicData;

  const stringDate = getStringDate({ year, month, day });
  const isInFavArray = favorites.some(e => e.num === num);

  const handleClick = () => {
    isInFavArray ? dispatch(deleteComic(comicData)) : dispatch(addComic(comicData));
  };

  return (
    <div className='card'>
      <div className='card-content'>
        <span>
          <p className='title'>{safe_title}</p>
        </span>
        <time dateTime={`${day}-${month}-${year}`}>
          <small>{stringDate}</small>
        </time>
      </div>
      <div className='card-image'>
        <figure className='image comic'>
          <img src={img} alt='comic-image' />
        </figure>
      </div>
      <div className='card-content has-text-centered'>
        <p className='subtitle'>{alt}</p>
        <div className='content'>{transcript}</div>
      </div>
      <footer className='card-footer'>
        <p className='card-footer-item'>
          <a onClick={handleClick}>{isInFavArray ? delete_text : add_text}</a>
        </p>
      </footer>
    </div>
  );
};

ComicCard.defaultProps = {
  add_text: 'Agregar a Favoritos ❤',
  delete_text: 'Eliminar de Favoritos ❤',
};

ComicCard.propTypes = {
  comicData: PropTypes.object.isRequired,
  add_text: PropTypes.string.isRequired,
  delete_text: PropTypes.string.isRequired,
};

export default ComicCard;
