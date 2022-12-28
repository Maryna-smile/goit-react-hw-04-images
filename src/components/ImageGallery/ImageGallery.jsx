import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import { Component } from 'react';
import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { fetchPictures } from '../../helpers/api/api';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    pictures: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchInput, page, toggleLoading } = this.props;
    if (prevProps.searchInput !== searchInput && searchInput) {
      toggleLoading();
      fetchPictures(searchInput)
        .then(hits => {
          if (hits.length === 0) {
            return Notiflix.Notify.info('Oops, we don`t have such photos');
          }
          this.setState({
            pictures: hits,
          });
        })
        .finally(() => toggleLoading());
    }
    if (page !== prevProps.page && page !== 1) {
      toggleLoading();
      fetchPictures(searchInput, page)
        .then(hits => {
          this.setState(prevState => {
            return {
              pictures: [...prevState.pictures, ...hits],
            };
          });
        })
        .finally(() => toggleLoading());
    }
  }

  render() {
    return (
      <div className={css.Container}>
        <ul className={css.ImageGallery}>
          {this.state.pictures.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                imgS={webformatURL}
                imgL={largeImageURL}
                getBigImg={this.props.getBigImg}
              />
            );
          })}
        </ul>

        {this.state.pictures.length >= 12 && this.state.pictures.length > 0 && (
          <Button getMorePictures={this.props.getMorePictures} />
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  toggleLoading: PropTypes.func,
  getMorePictures: PropTypes.func,
  getBigImg: PropTypes.func,
  page: PropTypes.number,
  searchInput: PropTypes.string,
};
