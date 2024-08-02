import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// import { SharedLayout } from 'components/SharedLayout/SharedLayout';
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
	import('../../pages/MovieInfoPage/MovieInfoPage')
);
const CastSection = lazy(() => import('../CastSection/CastSection'));
const ReviewsSection = lazy(() => import('../ReviewsSection/ReviewsSection'));

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<SharedLayout />}>
				<Route index element={<HomePage />} />
				<Route path="movies" element={<MoviesPage />} />
				<Route path="movies/:id" element={<MovieDetailsPage />}>
					<Route path="cast" element={<CastSection />} />
					<Route path="reviews" element={<ReviewsSection />} />
				</Route>
				<Route path="*" element={<HomePage />} />
			</Route>
		</Routes>
	);
};