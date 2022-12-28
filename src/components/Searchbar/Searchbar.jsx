import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import React, { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchInput: '',
  };

  getInputValue = e => {
    this.setState({
      searchInput: e.target.value.trim(),
    });
  };

  handleSubmit = e => {
    const { searchInput } = this.state;
    e.preventDefault();
    if (!searchInput) {
      return Notiflix.Notify.info('Please enter your request');
    }
    this.props.getPictures(searchInput);
  };

  render() {
    const { searchInput } = this.state;
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}></button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.getInputValue}
            value={searchInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  getPictures: PropTypes.func,
  getInputValue: PropTypes.func
}