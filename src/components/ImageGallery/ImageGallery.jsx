import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ imageList, openModal }) => {
  const onImageClick = event => {
    const imageTarget = event.target.closest('li');
    if (imageTarget) {
      const imgID = imageTarget.dataset.id;
      const clickedImage = imageList.find(image => image.id === imgID);
      if (clickedImage) {
        openModal(clickedImage);
      }
    }
  };

  return (
    <section>
      {imageList.length > 0 && (
        <ul className={css.gallery} onClick={onImageClick}>
          {imageList.map(img => (
            <li className={css.galleryItem} key={img.id} data-id={img.id}>
              <ImageCard imageItem={img} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ImageGallery;
