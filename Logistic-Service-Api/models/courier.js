module.exports = (sequelize, type) => {
  return sequelize.define('courier', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING(30),
    courierType: type.INTEGER
  }, {
      timestamps: false,
      freezeTableName: true
  });
}