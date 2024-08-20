import axios from "axios";
import { ACCESS_KEY } from './config';
import { useEffect, useState, useCallback } from 'react';
import './App.css';
import ErrorMessage from './components/error-message/ErrorMessage';
import ImageGallery from './components/image-gallery/ImageGallery';
import ImageModal from './components/image-modal/ImageModal';
import Loader from './components/loader/Loader';
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

  async function onSubmit(query, page = 1) {
    setCurrentPage(page);
    setIsErrorVisible(false);

    if (query !== currentQuery) {
      setCurrentQuery(query);
      setGallery([]);
    }
  }

  const shapeData = useCallback(data => {
    return data.map(item => ({
      alt: item.alt_description,
      id: item.id,
      fullImg: item.urls.full,
      smallImg: item.urls.small,
    }));
  }, []);

  function onLoadMore() {
    setCurrentPage(currentPage + 1);
  }

  function onOpenModal({ fullImg, alt }) {
    setModalImg({ fullImg, alt });
    setModalIsOpen(true);
  }

  function onCloseModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    async function fetchData() {
      axios.defaults.headers = ['Access-Control-Allow-Origin'];
  
      try {
        if (gallery.length === 0) {
          setIsLoading(true);
        }
  
        const { data } = await axios({
          method: 'get',
          url: `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${currentQuery}&page=${currentPage}&per_page=20`,
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

    if (currentQuery.length) {
      fetchData();
    }
  }, [currentPage, currentQuery, shapeData]);

  return (
    <>
      <SearchBar onSubmit={onSubmit} />

      {!isLoading &&
        gallery.length > 0 &&
        <ImageGallery gallery={gallery} openModal={onOpenModal} />}

      {isLoading && <Loader />}

      {!isLoading && isErrorVisible && <ErrorMessage />}

      {!isLoading &&
        !isErrorVisible &&
        totalPages > 1 &&
        currentPage !== totalPages &&
        !noResults && 
        <LoadMore loadMore={onLoadMore} />}

      {!isLoading && noResults && <p>No results</p>}

      {isModalOpen && <ImageModal
        alt={modalImg.alt}
        fullImg={modalImg.fullImg}
        closeModal={onCloseModal} />}
    </>
  )
}

export default App
