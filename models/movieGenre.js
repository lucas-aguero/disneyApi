module.exports = (sequelize, type) => {
    return sequelize.define('movieGenre', {
      id: {
        type: type.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      idMovie: type.INTEGER(11),
      idGenre: type.INTEGER(11),
    });
  };
  