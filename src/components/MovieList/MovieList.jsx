import MovieItem from '../MovieItem/MovieItem';

function MovieList({ movies, onSelectId }) {
	return (
		<ul className='list list-movies'>
			{movies?.map(movie => (
				<MovieItem movie={movie} key={movie.imdbID} onSelectId={onSelectId} />
			))}
		</ul>
	);
}

export default MovieList;
