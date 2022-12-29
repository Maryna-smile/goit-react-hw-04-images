import React, { useState } from 'react';
import { Hearts } from 'react-loader-spinner';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import css from './App.module.css';

export const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bigImg, setBigImg] = useState('');

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const getBigImg = e => {
    setBigImg(e.currentTarget.dataset.large);
    toggleModal();
  };

  const toggleLoading = () => {
    setIsLoading(prevState => !prevState);
  };

  const getPictures = value => {
    setSearchInput(value);
    setPage(1);
  };

  const getMorePictures = async () => {
    setPage(prevState => {
      return prevState + 1;
    });
  };

  return (
    <section>
      <Searchbar getPictures={getPictures} />
      <div className={css.loader}>
        {isLoading && (
          <Hearts
            height="120"
            width="150"
            color="#0a8fb1"
            ariaLabel="hearts-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
      </div>

      <ImageGallery
        toggleLoading={toggleLoading}
        page={page}
        getMorePictures={getMorePictures}
        searchInput={searchInput}
        getBigImg={getBigImg}
      />

      {showModal && <Modal url={bigImg} toggleModal={toggleModal} />}
    </section>
  );
};
