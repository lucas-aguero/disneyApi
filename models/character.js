module.exports = (sequelize, type) => {
    return sequelize.define('character', {
      id: {
        type: type.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING(50),
      age: type.INTEGER(2),
      weight: type.INTEGER(3),
      history: type.STRING(500),
      picture: type.STRING(300),
    });
  };
  