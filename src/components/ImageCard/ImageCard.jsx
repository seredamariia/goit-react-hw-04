import css from './ImageCard.module.css';

const ImageCard = ({
  imageItem: {
    alt,
    likes,
    urls: { small },
  },
}) => {
  return (
    <div>
      <img className={css.image} src={small} alt={alt} width="360" />
      <div className={css.infoContainer}>
        <p>❤️ {likes}</p>
      </div>
    </div>
  );
};

export default ImageCard;
