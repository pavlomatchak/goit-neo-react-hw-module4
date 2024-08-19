import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageCard from './image-card/ImageCard';

const ImageGallery = ({ gallery, openModal }) => {
  return (
    <ul className={css.list}>
      {gallery.map(item => {
        return <li key={item.id} className={css.item}>
          <ImageCard
            alt={item.alt}
            smallImg={item.smallImg}
            fullImg={item.fullImg}
            openModal={openModal} />
        </li>;
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      fullImg: PropTypes.string.isRequired,
      smallImg: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
