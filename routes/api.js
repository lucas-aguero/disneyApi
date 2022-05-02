const router = require('express').Router();

const middlewares = require('../middlewares/middlewares');

const apiRouterAuth = require('./api/auth');
const apiRouterCharacter = require('./api/character');
const apiRouterCharacterMovie = require('./api/characterMovie');
const apiRouterGenre = require('./api/genre');
const apiRouterMovie = require('./api/movie');
const apiRouterMovieGenre = require('./api/movieGenre');

router.use('/auth', apiRouterAuth);
router.use('/characters', middlewares.checkToken, apiRouterCharacter);
router.use('/charactermovie', middlewares.checkToken, apiRouterCharacterMovie);
router.use('/genre', middlewares.checkToken, apiRouterGenre);
router.use('/movies', middlewares.checkToken, apiRouterMovie);
router.use('/moviegenre', middlewares.checkToken, apiRouterMovieGenre);

module.exports = router;
