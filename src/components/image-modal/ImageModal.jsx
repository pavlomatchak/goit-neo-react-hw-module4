import PropTypes from 'prop-types';
import css from './ImageModal.module.css';

const ImageModal = ({ alt, fullImg, closeModal }) => {
  return (
    <div className={css.overlay} onClick={closeModal}>
      <img
        src={fullImg}
        alt={alt}
        className={css.image} />
    </div>
  );
}

ImageModal.propTypes = {
  alt: PropTypes.string.isRequired,
  fullImg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ImageModal;
