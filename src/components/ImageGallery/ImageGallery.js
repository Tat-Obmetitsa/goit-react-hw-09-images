import React, { useCallback, useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import s from '../ImageGallery/ImageGallery.module.css';


export default function ImageGallery ({ images }) {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const  toggleModal = useCallback(() => {
    setShowModal(prevShowModal => !prevShowModal);
    setModalImage(null);
  }, []);

  const openModal = useCallback((modalImage)  => {
    toggleModal();
    setModalImage(modalImage);
  }, [toggleModal]);


  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          {<img src={modalImage} alt="#" />}
        </Modal>
      )}
      <ul className={s.gallery}>
        {images.map(e => (
          <ImageGalleryItem
            key={e.id}
            url={e.webformatURL}
            alt={e.tags}
            modalImage={e.largeImageURL}
            openModal={openModal}
          />
        ))}
      </ul>
    </>
  );
}





// Without hooks

// import React, { Component } from 'react';
// // import PropTypes from 'prop-types';
// import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
// import Modal from '../Modal/Modal';
// import s from '../ImageGallery/ImageGallery.module.css';
// class ImageGallery extends Component {
//   state = {
//     showModal: false,
//     modalImage: '',
//     url: '',
//   };
//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };
//   openModal = modalImage => {
//     this.toggleModal();

//     this.setState({ modalImage });
//   };
//   render() {
//     const { images } = this.props;
//     const { showModal, modalImage } = this.state;
//     return (
//       <>
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             {<img src={modalImage} alt="#" />}
//           </Modal>
//         )}
//         <ul className={s.gallery}>
//           {images.map(e => (
//             <ImageGalleryItem
//               key={e.id}
//               url={e.webformatURL}
//               alt={e.tags}
//               modalImage={e.largeImageURL}
//               openModal={this.openModal}
//             />
//           ))}
//         </ul>
//       </>
//     );
//   }
// }
// export default ImageGallery;
