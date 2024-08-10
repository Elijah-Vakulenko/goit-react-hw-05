import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
	import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const CastSection = lazy(() => import('./components/MovieCast/MovieCast'));
const ReviewsSection = lazy(() => import('./components/MovieReviews/MovieReviews'));

export const App = () => {
	return (
		<>
			<Navigation />
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="movies" element={<MoviesPage />} />
					<Route path="movies/:id" element={<MovieDetailsPage />}>
						<Route path="cast" element={<CastSection />} />
						<Route path="reviews" element={<ReviewsSection />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Suspense>
	</>
	);
};