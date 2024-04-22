import { getImages } from '../../unsplash';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageModal from '../ImageModal/ImageModal';

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const handleSearch = async searchQuery => {
    try {
      setLoading(true);
      setIsSearching(true);
      setImages([]);
      setPage(1);
      setSearch(searchQuery);
      const data = await getImages(searchQuery, 1);
      setTotalPages(data.total_pages);
      setImages(data.results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const data = await getImages(search, nextPage);
      setImages(prevImages => {
        return [...prevImages, ...data.results];
      });
      setPage(nextPage);
    } catch (error) {
      setError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  const isVisible = () => {
    return totalPages !== 0 && totalPages !== page && !loadingMore;
  };

  const openModal = image => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery imageList={images} openModal={openModal} />
      {!loadingMore && !isSearching && (
        <LoadMoreBtn onClick={handleLoadMore} isVisible={isVisible} />
      )}
      {loadingMore && !error && <Loader />}
      <ImageModal
        isOpen={modalIsOpen}
        image={selectedImage}
        onCloseModal={closeModal}
      />
    </>
  );
}

export default App;
