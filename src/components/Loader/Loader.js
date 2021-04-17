import React from 'react';
import Spinner from 'react-loader-spinner';
import s from '../Loader/Loader.module.css';
const Loader = () => {
  return (
    <div className={s.loader}>
      <Spinner
        type="Puff"
        color="#00BFFF"
        height={75}
        width={75}
        timeout={5000}
      />
    </div>
  );
};

export default Loader;
