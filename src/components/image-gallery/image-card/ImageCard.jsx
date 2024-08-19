import PropTypes from 'prop-types';
import css from './ImageCard.module.css';

const ImageCard = ({ alt, smallImg, fullImg, openModal }) => {
  return (
    <div>
      <img
        src={smallImg}
        alt={alt}
        className={css.image}
        onClick={() => openModal({ fullImg, alt })} />
    </div>
  );
}

ImageCard.propTypes = {
  alt: PropTypes.string.isRequired,
  fullImg: PropTypes.string.isRequired,
  smallImg: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageCard;
