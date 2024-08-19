import PropTypes from 'prop-types';
import css from './SearchBar.module.css';

const SarchBar = ({ onSearch }) => {
  function search(e) {
    e.preventDefault();
    const value = e.target.elements.input.value.trim();
    if (value.length > 0) {
      onSearch(value);
    }
  }

  return (
    <header className={css.header}>
      <form
        className={css.form}
        onSubmit={search}>
        <button
          type="submit"
          className={css.button}>
            &#128269;
        </button>

        <input
          name="input"
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
          className={css.input}
        />
      </form>
    </header>
  );
}

SarchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SarchBar;
