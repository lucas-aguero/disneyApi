const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { sequelize} = require("../../config/database");

const { Movie } = require("../../config/database");

router.post("/",[
        check("title", "Title is Empty.").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ error: errors.array() });
        }

        const movie = await Movie.create(req.body);
        res.json(movie);
});

router.put("/:id", async (req, res) => {
    const movie = await Movie.findOne({ where: { id: req.params.id } });

    if (movie) {
        await Movie.update(req.body, {where: { id: req.params.id },});
        res.json({ success: "Movie Updated" });
    } else {
        res.json({ error: "Movie not Found" });
    }      
});

router.delete("/:id", async (req, res) => {
    const movie = await Movie.findOne({ where: { id: req.params.id } });

    if (movie) {
        await Movie.destroy({ where: { id: req.params.id },});
        res.json({ success: "Movie Deleted" });
    } else {
        res.json({ error: "Movie not Found" });
    }      
});

router.get("/:id", async (req, res) => {
    const movie = await Movie.findOne({ where: { id: req.params.id } });

    if (movie) {
        const [movieData, metadataMovie] = await sequelize.query(
            "SELECT movies.id, movies.title, movies.date,movies.score,movies.isSeries,movies.picture FROM movies WHERE id = :idMovie"
            , {replacements: {idMovie: req.params.id}} );
        const [genreData, metadataGenre] = await sequelize.query(
            "SELECT genres.id, genres.name,genres.picture FROM genres INNER JOIN movieGenres ON genres.id = movieGenres.idGenre WHERE movieGenres.idMovie = :idMovie"
            , {replacements: {idMovie: req.params.id}} );
        const [characterData, metadataCharacter] = await sequelize.query(
            "SELECT characters.id,characters.name,characters.age,characters.weight,characters.picture,characters.history FROM characters INNER JOIN characterMovies ON characters.id = characterMovies.idCharacter WHERE characterMovies.idMovie = :idMovie"
            , {replacements: {idMovie: req.params.id}} );

         res.json({ movieData , characterData , genreData});
    } else {
        res.json({ error: "Movie not Found" });
    }      
});

router.get("/", async (req, res) => {

    if ((typeof(req.query.name) == "undefined") && (typeof(req.query.genre) == "undefined") && (typeof(req.query.order) == "undefined")){
        const movieList = await Movie.findAll({attributes: ['id', 'title','picture','date']});
        res.json(movieList);
    } else {
      
        let queryString = `SELECT movies.id, movies.title, movies.date, movies.picture, movieGenres.idGenre FROM movies INNER JOIN movieGenres ON movies.id = movieGenres.idMovie`;

        if ((typeof(req.query.name) != "undefined") && (typeof(req.query.genre) != "undefined")) {
            queryString += ` WHERE movies.title LIKE "%${req.query.name}%" AND movieGenres.idGenre = ${req.query.genre}`;
        } else if ((typeof(req.query.name) != "undefined")) {
            queryString += ` WHERE movies.title LIKE "%${req.query.name}%"`;
        } else if ((typeof(req.query.genre) != "undefined")) {
            queryString += ` WHERE movieGenres.idGenre = ${req.query.genre}`;
        }

        if ((typeof(req.query.order) != "undefined") && ((req.query.order.toUpperCase() == "ASC") || (req.query.order.toUpperCase() == "DESC" ))) {
            queryString += ` ORDER BY movies.title ${req.query.order.toUpperCase()}`;
        } else if (typeof(req.query.order) != "undefined"){
            queryString = "";
            res.json ({ error: "Invalid ORDER option. Please use ASC or DESC" });
        }

        if (queryString != "") {
            const [movieData, metadataMovie] = await sequelize.query(queryString);
            res.json({ movieData });
        }
    }
});

module.exports = router;
