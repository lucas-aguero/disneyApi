module.exports = (sequelize, type) => {
    return sequelize.define('user', {
      id: {
        type: type.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      email: type.STRING(50),
      password: type.STRING(150),
      name_first: type.STRING(30),
      name_last: type.STRING(30),
    });
  };
  