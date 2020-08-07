import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { getComic } from 'actions';
import { getCurrentComic, getTotal } from 'selectors';

const Pagination = ({ next_text, previous_text }) => {
  const dispatch = useDispatch();
  const total = useSelector(getTotal);
  const currentComic = useSelector(getCurrentComic);

  const handleClick = e => {
    e.target.title === 'next'
      ? dispatch(getComic({ num: currentComic + 1 }))
      : dispatch(getComic({ num: currentComic - 1 }));
  };

  return (
    <nav className='pagination column is-rounded' role='navigation' aria-label='pagination'>
      <button
        title='next'
        onClick={e => handleClick(e)}
        className='pagination-next button is-dark'
        disabled={currentComic === total}
      >
        {next_text}
      </button>
      <button
        title='prev'
        onClick={e => handleClick(e)}
        className='pagination-previous button is-dark'
        disabled={currentComic === 1}
      >
        {previous_text}
      </button>
    </nav>
  );
};

Pagination.defaultProps = {
  next_text: 'Siguiente',
  previous_text: 'Anterior',
};

Pagination.propTypes = {
  next_text: PropTypes.string.isRequired,
  previous_text: PropTypes.string.isRequired,
};

export default Pagination;
