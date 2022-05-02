module.exports = (sequelize, type) => {
    return sequelize.define('movie', {
      id: {
        type: type.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      title: type.STRING(50),
      date: type.DATE,
      picture: type.STRING(300),
      score:  type.INTEGER(1),
      isSeries: type.INTEGER(1),
    });
  };
  