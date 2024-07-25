import PropTypes from 'prop-types';

//========== hooks ==========
import { useLocation } from 'react-router-dom';

//========== components ==========
import { Link } from 'react-router-dom';

//========== styles ==========
import {
	List,
	Item,
	MoviePoster,
	Wrapper,
	Title,
	InfoWrapper,
	Info,
	DateInfo,
	Divider,
} from './MoviesList.styled';

const MoviesList = ({ moviesInfo }) => {
	const location = useLocation();

	return (
		<List>
			{moviesInfo.map(({ id, title, release_date, vote_average, poster_path }) => {
				const fixedVotes = vote_average.toFixed(1);
				const fixedDate = release_date
					? release_date.split('-').reverse().join('.')
					: '';
				const isReleaseDate = Boolean(fixedDate);

				return (
					<Item key={id}>
						<Link to={`/movies/${id}`} state={{ from: location }}>
							<MoviePoster src={poster_path} alt={title} />
							<Wrapper>
								<Title>{title}</Title>
								<InfoWrapper>
									<Info>{fixedVotes}</Info>
									{isReleaseDate && (
										<>
											<Divider>I</Divider>
											<DateInfo>{fixedDate}</DateInfo>
										</>
									)}
								</InfoWrapper>
							</Wrapper>
						</Link>
					</Item>
				);
			})}
		</List>
	);
};

MoviesList.propTypes = {
	moviesInfo: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			release_date: PropTypes.string,
			vote_average: PropTypes.number.isRequired,
			poster_path: PropTypes.any.isRequired,
		})
	),
};

export { MoviesList };