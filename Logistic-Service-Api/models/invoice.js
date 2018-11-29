module.exports = (sequelize, type) => {
  return sequelize.define('invoice', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: type.INTEGER,
    requestId: type.INTEGER,
    customerId: type.INTEGER
  }, {
      timestamps: false,
      freezeTableName: true
  });
}