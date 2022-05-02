module.exports = (sequelize, type) => {
    return sequelize.define('genre', {
      id: {
        type: type.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING(50),
      picture: type.STRING(300),
    });
  };
  