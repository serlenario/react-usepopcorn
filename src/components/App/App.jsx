import Header from '../Header/Header';
import Box from '../Box/Box';
import MovieList from '../MovieList/MovieList';
import WatchedSummary from '../WatchedSummary/WatchedSummary';
import WatchedMovieList from '../WatchedMovieList/WatchedMovieList';
import getMovies from '../../services/getMovies';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieDetails from '../MovieDetails/MovieDetails';
import { useEffect, useState } from 'react';

const average = arr =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
	const [query, setQuery] = useState('');
	const [movies, setMovies] = useState([]);
	const [watchedMovies, setWatchedMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [selectedId, setSelectedId] = useState(null);

	getMovies(setMovies, setIsLoading, setError, query, handleCloseMovie);

	function handleSelectMovie(id) {
		setSelectedId(selected => (id === selected ? null : id));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddWatched(movie) {
		setWatchedMovies(watched => [...watched, movie]);
	}

	function handleDeleteWatched(id) {
		setWatchedMovies(watched => watched.filter(movie => movie.imdbID !== id));
	}

	useEffect(
		function () {
			const callback = function (e) {
				if (e.code === 'Escape') {
					handleCloseMovie();
				}
			};

			document.addEventListener('keydown', callback);

			return function () {
				document.removeEventListener('keydown', callback);
			};
		},
		[handleCloseMovie]
	);

	return (
		<>
			<Header movies={movies} query={query} setQuery={setQuery} />

			<main className='main'>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MovieList movies={movies} onSelectId={handleSelectMovie} />
					)}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleAddWatched}
							watched={watchedMovies}
						/>
					) : (
						<>
							<WatchedSummary watched={watchedMovies} average={average} />
							<WatchedMovieList
								watched={watchedMovies}
								onDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</Box>
			</main>
		</>
	);
}
