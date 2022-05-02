module.exports = (sequelize, type) => {
    return sequelize.define('characterMovie', {
      id: {
        type: type.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      idCharacter: type.INTEGER(11),
      idMovie: type.INTEGER(11),
    });
  };
  