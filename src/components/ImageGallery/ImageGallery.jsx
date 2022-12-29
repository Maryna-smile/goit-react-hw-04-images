import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import React from 'react';
import { useState, useEffect } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { fetchPictures } from '../../helpers/api/api';
import css from './ImageGallery.module.css';

export const ImageGallery = ({
  getMorePictures,
  getBigImg,
  toggleLoading,
  page,
  searchInput,
}) => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    if (searchInput) {
      toggleLoading();
      fetchPictures(searchInput)
        .then(hits => {
          if (hits.length === 0) {
            return Notiflix.Notify.info('Oops, we don`t have such photos');
          }
          setPictures(hits);
        })
        .finally(() => toggleLoading());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    if (page !== 1) {
      console.log(111);
      toggleLoading();
      fetchPictures(searchInput, page)
        .then(hits => {
          setPictures(prevState => {
            return [...prevState, ...hits];
          });
        })
        .finally(() => {
          toggleLoading();
          console.log('hello');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className={css.Container}>
      <ul className={css.ImageGallery}>
        {pictures.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              imgS={webformatURL}
              imgL={largeImageURL}
              getBigImg={getBigImg}
            />
          );
        })}
      </ul>

      {pictures.length >= 12 && pictures.length > 0 && (
        <Button getMorePictures={getMorePictures} />
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  toggleLoading: PropTypes.func,
  getMorePictures: PropTypes.func,
  getBigImg: PropTypes.func,
  page: PropTypes.number,
  searchInput: PropTypes.string,
};
