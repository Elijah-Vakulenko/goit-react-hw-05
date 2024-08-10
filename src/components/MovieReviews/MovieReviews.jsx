import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../../services/api';
import s from './MovieReviews.module.css';

const MovieReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        const data = await fetchReviews(id);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      }
    };

    getMovieReviews();
  }, [id]);

  return (
    <div>
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map(review => (
            <li key={review.id}>
              <fieldset className={s.review}>
              	<legend><p className={s.title}>Author: {review.author}</p></legend>
	              <p>{review.content}</p>
              </fieldset>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews added yet</p>
      )}
    </div>
  );
};

export default MovieReviews;