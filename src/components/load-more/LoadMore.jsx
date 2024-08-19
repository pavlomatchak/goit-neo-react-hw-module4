import PropTypes from 'prop-types';

const ImageCard = ({ loadMore }) => {
  return (
    <button type="button" onClick={loadMore}>Load More</button>
  );
}

ImageCard.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default ImageCard;
