import React, { Component } from 'react';
import { Hearts } from 'react-loader-spinner';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import css from './App.module.css';

export default class App extends Component {
  state = {
    searchInput: '',
    page: 1,
    isLoading: false,
    error: '',
    showModal: false,
    bigImg: '',
  };

  getBigImg = e => {
    this.setState({
      bigImg: e.currentTarget.dataset.large,
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  toggleLoading = () => {
    this.setState(prevState => {
      return {
        isLoading: !prevState.isLoading,
      };
    });
  };

  getPictures = value => {
    this.setState({
      searchInput: value,
      page: 1,
    });
  };

  getMorePictures = async () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { showModal, isLoading, bigImg } = this.state;
    return (
      <section>
        <Searchbar
          getPictures={this.getPictures}
          getInputValue={this.getInputValue}
        />
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
          toggleLoading={this.toggleLoading}
          page={this.state.page}
          getMorePictures={this.getMorePictures}
          searchInput={this.state.searchInput}
          getBigImg={this.getBigImg}
        />

        {showModal && <Modal url={bigImg} toggleModal={this.toggleModal} />}
      </section>
    );
  }
}
