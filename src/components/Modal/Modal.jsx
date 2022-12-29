import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ toggleModal, url }) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const onKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };
  return (
    <div className={css.backdrop} onClick={onBackdropClick}>
      <div className={css.modal}>
        <img src={url} alt="img" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func,
};
