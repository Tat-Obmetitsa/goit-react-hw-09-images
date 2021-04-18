// import React, { useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import s from '../Modal/Modal.module.css';
// const modalRoot = document.querySelector('#modal-root');

// export default function Modal ({children}, onClose) {

//   componentDidMount() {
//     window.addEventListener('keydown', this.closeModal);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.closeModal);
//   }
//   const closeModal = e => {
//     if (e.code === 'Escape') {
//       console.log('Нажали ESC, нужно закрыть модалку');

//       this.props.onClose();
//     }
//   };

//   const closeModalClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   return createPortal(
//     <div className={s.Overlay} onClick={closeModalClick}>
//       <div className={s.Modal}>{children}</div>
//     </div>,
//     modalRoot,
//   );
// }




// Without hooks

import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from '../Modal/Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }
  closeModal = e => {
    if (e.code === 'Escape') {
      console.log('Нажали ESC, нужно закрыть модалку');

      this.props.onClose();
    }
  };

  closeModalClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.closeModalClick}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
