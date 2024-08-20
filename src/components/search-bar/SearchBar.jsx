import PropTypes from 'prop-types';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './SearchBar.module.css';

const SarchBar = ({ onSubmit }) => {
  function submit(e) {
    e.preventDefault();
    const value = e.target.elements.input.value.trim();
    if (value.length > 0) {
      onSubmit(value);
    } else {
      toast.error('Please enter text', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    }
  }

  return (
    <>
      <header className={css.header}>
        <form
          className={css.form}
          onSubmit={submit}>
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

      <ToastContainer />
    </>
  );
}

SarchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SarchBar;
