import PropTypes from 'prop-types';
import { xkcd } from 'store/models';

const {
  target: { comic },
} = xkcd;

const ComicCard = ({ mark_text }) => {
  const { safe_title, alt, img, month, year, day, transcript } = comic;

  const date = new Date(year, month, day);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const stringDate = date.toLocaleDateString('es-ES', options);

  const handleClick = e => {
    console.log('click para añadir a favoritos', comic);
    //   dispatch(fetchGifs({ value: valueInput, trending: false }));
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
          <a onClick={handleClick}>{mark_text}</a>
        </p>
      </footer>
    </div>
  );
};

ComicCard.defaultProps = {
  mark_text: 'Añadir a Favoritos ❤',
};

ComicCard.propTypes = {
  mark_text: PropTypes.string.isRequired,
};

export default ComicCard;
