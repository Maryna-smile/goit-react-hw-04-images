import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({getMorePictures}) => {
  return (
    <button className={css.Button} onClick={getMorePictures}>load more</button>
  )
}


Button.propTypes = {
  getMorePictures: PropTypes.func
}