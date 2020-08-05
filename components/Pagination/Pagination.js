import React, { useState } from 'react';

import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';

const Pagination = ({ next_text, previous_text }) => {
  // const dispatch = useDispatch();
  const [valueInput, setValueInput] = useState('');
  const [helpHidden, setHelpHidden] = useState(true);

  const handleClick = e => {
    console.log(e);
    //   dispatch(fetchGifs({ value: valueInput, trending: false }));
  };

  return (
    <nav className='pagination column is-rounded' role='navigation' aria-label='pagination'>
      <button className='pagination-previous button is-dark'>{previous_text}</button>
      <button className='pagination-next button is-dark'>{next_text}</button>
    </nav>
  );
};

Pagination.defaultProps = {
  next_text: 'Anterior',
  previous_text: 'Siguiente',
};

Pagination.propTypes = {
  next_text: PropTypes.string.isRequired,
  previous_text: PropTypes.string.isRequired,
};

export default Pagination;
