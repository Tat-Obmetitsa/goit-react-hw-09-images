import React from 'react';
import s from '../Button/Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
  <button onClick={onClick} type="button" className={s.Button}>
    Load more
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
