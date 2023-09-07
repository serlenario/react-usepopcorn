import { useEffect, useState } from 'react';
import getMovieDetails from '../../services/getMovieDetails';
import StarRating from '../StarRating/StarRating';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [userRating, setUserRating] = useState('');

	getMovieDetails(selectedId, setMovie, setIsLoading, setError);

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	function handleAdd() {
		const newWatchedMovies = {
			imdbID: selectedId,
			title,
			year,
			imdbRating: +imdbRating,
			runtime: +runtime.split(' ')[0],
			poster,
			userRating,
		};

		onAddWatched(newWatchedMovies);
		onCloseMovie();
	}

	const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);

	const watchedUserRating = watched.find(
		movie => movie.imdbID === selectedId
	)?.userRating;

	useEffect(
		function () {
			if (!title) return;
			document.title = `Movie | ${title}`;

			return function () {
				document.title = 'usePopcorn';
			};
		},
		[title]
	);

	return (
		<div className='details'>
			{/* {isLoading && <Loader />} */}
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className='btn-back' onClick={onCloseMovie}>
							&larr;
						</button>

						<img src={poster} alt={`Poster of ${title}`} />
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>⭐ {imdbRating} IMDb rating</p>
						</div>
					</header>

					<section>
						<div className='rating'>
							{!isWatched ? (
								<StarRating
									maxRating={10}
									size={24}
									onSetRating={setUserRating}
								/>
							) : (
								<p>You rated this movie {watchedUserRating} ⭐</p>
							)}

							{userRating > 0 && (
								<button className='btn-add' onClick={handleAdd}>
									+ Add to list
								</button>
							)}
						</div>

						<p>
							<em>{plot}</em>
						</p>

						<p>Starring {actors}</p>

						<p>Directed by {director}</p>
					</section>
				</>
			)}
			{/* {error && <ErrorMessage message={error} />} */}
		</div>
	);
}

export default MovieDetails;
