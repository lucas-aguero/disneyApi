const config = require("./config");
const Sequelize = require("sequelize");

const CharacterModel = require('../models/character');
const CharacterMovieModel = require('../models/characterMovie');
const GenreModel = require('../models/genre');
const MovieModel = require('../models/movie');
const MovieGenreModel = require('../models/movieGenre');
const UserModel = require('../models/user');


const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD,{
    host: config.DB_HOST,
    dialect: config.DB_TYPE,
  }
);

const Character =  CharacterModel(sequelize,Sequelize);
const CharacterMovie =  CharacterMovieModel(sequelize,Sequelize);
const Genre =  GenreModel(sequelize,Sequelize);
const Movie =  MovieModel(sequelize,Sequelize);
const MovieGenre =  MovieGenreModel(sequelize,Sequelize);
const User =  UserModel(sequelize,Sequelize);

sequelize.sync({ force: false })
.then(()=> {
    console.log("|--------------------");
    console.log(`| DATABASE TYPE     : ${config.DB_TYPE}`);    
    console.log(`| DATABASE NAME     : ${config.DB_NAME}`)
    console.log('| DATABASE TABLES   : SYNCHRONIZATION OK')
    console.log("|--------------------");
})

module.exports = {
  Character,
  CharacterMovie,
  Genre,
  Movie,
  MovieGenre,
  User,
  sequelize
}
