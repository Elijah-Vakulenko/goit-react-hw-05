import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from '../../services/api';
import s from './MovieCast.module.css';

const MovieCast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    const getMovieCast = async () => {
      try {
        const data = await fetchCast (id);
        setCast(data);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      }
    };

    getMovieCast();
  }, [id]);

  const defaultPhoto =
    'https://upload.wikimedia.org/wikipedia/en/6/68/Riddler.png';

  return (
    <div>
      <ul className={s.list}>
        {cast.map(member => (
          <li key={member.cast_id} className={s.wrapper}>
				<img
					className={s.photo}
              src={
                member.profile_path
                  ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                  : defaultPhoto
              }
              alt={member.original_title}
            />
            <div className={s.info}>
              <p>{member.name}</p>
              <p>Character: {member.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;