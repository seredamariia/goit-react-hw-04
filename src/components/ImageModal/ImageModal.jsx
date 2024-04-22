import Modal from 'react-modal';
import css from './ImageModal.module.css';

const ImageModal = ({ isOpen, onCloseModal, image }) => {
  return (
    <Modal
      overlayClassName={css.backdrop}
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
    >
      {image && (
        <div className={css.modalContainer}>
          <div className={css.imageContainer}>
            <img
              className={css.image}
              src={image.urls.regular}
              alt={image.alt}
            />
          </div>
          <div className={css.infoContainer}>
            {image.description && <p>{image.description}</p>}
            <p>❤️ {image.likes}</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
