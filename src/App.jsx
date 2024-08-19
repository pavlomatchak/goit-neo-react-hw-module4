import axios from "axios";
import { ACCESS_KEY } from './config';
import { useEffect, useState, useCallback } from 'react';
import { ColorRing } from 'react-loader-spinner'
import './App.css';
import ImageGallery from './components/image-gallery/ImageGallery';
import ImageModal from './components/image-modal/ImageModal';
import LoadMore from './components/load-more/LoadMore';
import SearchBar from './components/search-bar/SearchBar';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState({});
  const [noResults, setNoResults] = useState(false);

  async function search(query, page = 1) {
    setCurrentPage(page);
    setIsErrorVisible(false);

    if (query !== currentQuery) {
      setCurrentQuery(query);
      setGallery([]);
    }

    axios.defaults.headers = ['Access-Control-Allow-Origin'];

    try {
      if (gallery.length === 0) {
        setIsLoading(true);
      }

      const { data } = await axios({
        method: 'get',
        url: `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${query}&page=${page}&per_page=20`,
        responseType: 'json',
      });

      if (data.results.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
        setGallery(prevGallery => {
          return [
            ...prevGallery,
            ...shapeData(data.results),
          ];
        });
      }

      setTotalPages(data.total_pages);
    } catch(e) {
      console.log(e);
      setIsErrorVisible(true);
    } finally {
      setIsLoading(false);
    }
  }

  function shapeData(data) {
    const arr = [];

    data.forEach(item => {
      arr.push({
        alt: item.alt_description,
        id: item.id,
        fullImg: item.urls.full,
        smallImg: item.urls.small,
      });
    });

    return arr;
  }

  function onLoadMore() {
    search(currentQuery, currentPage + 1);
    setCurrentPage(currentPage + 1);
  }

  function onOpenModal({ fullImg, alt }) {
    setModalImg({ fullImg, alt });
    setModalIsOpen(true);
  }

  const onCloseModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = e => {
      if ((e.key === 'Escape' || e.key === 'Esc') && isModalOpen) {
        onCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, onCloseModal]);

  return (
    <>
      <SearchBar onSearch={search} />

      {!isLoading && gallery.length > 0 && <ImageGallery gallery={gallery} openModal={onOpenModal} />}

      {isLoading && <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      }

      {!isLoading && isErrorVisible && <p>Something went wrong</p>}

      {!isLoading && !isErrorVisible && totalPages > 1 && currentPage !== totalPages && !noResults && <LoadMore loadMore={onLoadMore} />}

      {!isLoading && noResults && <p>No results</p>}

      {isModalOpen && <ImageModal
        alt={modalImg.alt}
        fullImg={modalImg.fullImg}
        closeModal={onCloseModal} />}
    </>
  )
}

export default App
