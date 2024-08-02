import MovieAPI from 'API/API';
import { Outlet } from 'react-router-dom';
import { Container } from 'components/Container/Container';
import { FiChevronsLeft } from 'react-icons/fi';
import posterPlaceholder from 'images/posterPlaceholder.png';
import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
	Main,
	BackLink,
	LinkSpan,
	Card,
	Title,
	Devider,
	TitleSpan,
	Poster,
	InfoWrapper,
	Info,
	InfoSpan,
	AddWrapper,
	AddTitle,
	AddList,
	AddItem,
	AddLink,
} from './MovieInfoPage.styled';

const MovieInfoPage = () => {
	const { id } = useParams();
	const [movieInfo, setMovieInfo] = useState(null);
	const location = useLocation();
	const backLinkHref = location.state?.from ?? '/';

	useEffect(() => {
		MovieAPI.getMovieById(id).then(movie => {
			const poster = movie.poster_path
				? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
				: posterPlaceholder;
			const info = {
				title: movie.title,
				poster_path: poster,
				genres: movie.genres.map(genre => genre.name).join(', '),
				release_date: movie.release_date,
				overview: movie.overview,
				vote_average: movie.vote_average,
			};
			setMovieInfo(info);
		});
	}, [id]);

	if (!movieInfo) return;

	const { title, poster_path, genres, release_date, overview, vote_average } =
		movieInfo;

	const areGenres = Boolean(genres.length);
	const year = release_date ? release_date.split('-')[0] : '';
	const isReleaseDate = Boolean(release_date);
	const rating = vote_average.toFixed(1);

	return (
		<Main>
			<Container>
				<BackLink to={backLinkHref} title="Go back">
					<FiChevronsLeft />
					<LinkSpan>Go back</LinkSpan>
				</BackLink>
				<Card>
					<Poster src={poster_path} alt={title} />
					<InfoWrapper>
						<div>
							<Title>
								{title}
								{isReleaseDate && (
									<>
										<Devider>I</Devider>
										<TitleSpan>{year}</TitleSpan>
									</>
								)}
							</Title>
							<Info>
								Movie rating<Devider>I</Devider>
								<InfoSpan>{rating}</InfoSpan>
							</Info>
							<Info>
								Overview<Devider>I</Devider>
								<InfoSpan>{overview}</InfoSpan>
							</Info>
							{areGenres && (
								<Info>
									Genres<Devider>I</Devider>
									<InfoSpan>{genres}</InfoSpan>
								</Info>
							)}
						</div>
						<AddWrapper>
							<AddTitle>Additional information</AddTitle>
							<AddList>
								<AddItem>
									<AddLink to="cast" state={{ from: backLinkHref }}>
										Cast
									</AddLink>
								</AddItem>
								<AddItem>
									<AddLink to="reviews" state={{ from: backLinkHref }}>
										Reviews
									</AddLink>
								</AddItem>
							</AddList>
						</AddWrapper>
					</InfoWrapper>
				</Card>
				<Suspense>
					<Outlet />
				</Suspense>
			</Container>
		</Main>
	);
};

export default MovieInfoPage;