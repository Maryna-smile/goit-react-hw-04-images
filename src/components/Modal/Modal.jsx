import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <div className={css.backdrop} onClick={this.onBackdropClick}>
        <div className={css.modal}>
          <img src={this.props.url} alt="img" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func,
};
