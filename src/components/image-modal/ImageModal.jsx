import PropTypes from 'prop-types';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ alt, fullImg, closeModal }) => {
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, .75',
    },
    content: {
      backgroundColor: '#000',
      borderColor: '#000',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      style={customStyles}>
      <img
        src={fullImg}
        alt={alt}
        className={css.image} />
    </Modal>
  );
}

ImageModal.propTypes = {
  alt: PropTypes.string.isRequired,
  fullImg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ImageModal;
