import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
export default function ImageGalleryItem({ imgS, imgL, getBigImg }) {
  return (
    <li className={css.galleryItem} data-large={imgL} onClick={getBigImg}>
      <div className={css.imgThumb}>
        {' '}
        <img src={imgS} alt="name" className={css.ImageGalleryItemImage} />
      </div>
    </li>
  );
}

ImageGalleryItem.propTypes = {
  imgS: PropTypes.string,
  imgL: PropTypes.string,
  getBigImg: PropTypes.func,
};
