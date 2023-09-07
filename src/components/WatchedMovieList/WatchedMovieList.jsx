import WatchedMovieItem from '../WatchedMovieItem/WatchedMovieItem';

function WatchedMovieList({ watched, onDeleteWatched }) {
	return (
		<ul className='list'>
			{watched.map(movie => (
				<WatchedMovieItem
					movie={movie}
					key={movie.imdbID}
					onDeleteWatched={onDeleteWatched}
				/>
			))}
		</ul>
	);
}

export default WatchedMovieList;
