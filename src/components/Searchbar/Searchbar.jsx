import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ getPictures }) => {
  const [searchInput, setSearchInput] = useState('');

  const getInputValue = e => {
    setSearchInput(e.target.value.trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!searchInput) {
      return Notiflix.Notify.info('Please enter your request');
    }
    getPictures(searchInput);
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}></button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={getInputValue}
          value={searchInput}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  getPictures: PropTypes.func,
  getInputValue: PropTypes.func,
};
