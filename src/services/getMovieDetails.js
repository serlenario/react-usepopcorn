import { useEffect } from 'react';

const KEY = '432e8965';

function getMovieDetails(selectedId, setMovie, setIsLoading, setError) {
	useEffect(
		function () {
			async function fetchMovieDetails() {
				try {
					// setIsLoading(true);
					setError('');

					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
					);

					if (!res.ok)
						throw new Error('Something went wrong with fetching movie');

					const data = await res.json();

					setMovie(data);
				} catch (err) {
					setError(err.message);
				} finally {
					setIsLoading(false);
				}
			}

			fetchMovieDetails();
		},
		[selectedId]
	);
}

export default getMovieDetails;
