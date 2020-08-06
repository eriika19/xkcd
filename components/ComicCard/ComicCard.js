import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { getStringDate } from 'utils';
import { getFavoritesData } from 'selectors';

const ComicCard = ({ comicData, toogleFavItem, add_text, delete_text }) => {
  const favorites = useSelector(getFavoritesData);
  const { alt, day, img, month, num, safe_title, year } = comicData;

  const stringDate = getStringDate({ year, month, day });
  const isInFavArray = favorites.some(e => e.num === num);

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
      <div className='card-content has-text-centered mb-2'>
        <p className='subtitle'>{alt}</p>
      </div>
      <footer className='card-footer'>
        <p className='card-footer-item'>
          <a onClick={() => toogleFavItem(isInFavArray)} aria-label='search-input'>
            {isInFavArray ? delete_text : add_text}
          </a>
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
  toogleFavItem: PropTypes.func.isRequired,
  add_text: PropTypes.string.isRequired,
  delete_text: PropTypes.string.isRequired,
};

export default ComicCard;
