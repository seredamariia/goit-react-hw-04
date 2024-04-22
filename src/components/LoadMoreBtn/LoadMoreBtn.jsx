import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, isVisible }) => {
  return (
    <div className={css.buttonContainer}>
      {isVisible() && <button onClick={onClick}>Load More</button>}
    </div>
  );
};

export default LoadMoreBtn;
