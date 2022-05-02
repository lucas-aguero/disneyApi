SELECT * FROM
movies
INNER JOIN movieGenres
ON movies.id = movieGenres.idMovie
INNER JOIN genres
ON genres.id = movieGenres.idGenre
INNER JOIN characterMovies
ON characterMovies.idMovie = movies.id
WHERE 
movies.id = 5

;