module.exports = (sequelize, type) => {
  return sequelize.define('customer', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING(30),
    customerType: type.INTEGER,
    address: type.TEXT
  }, {
      timestamps: false,
      freezeTableName: true
  });
}