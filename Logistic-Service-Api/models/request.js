module.exports = (sequelize, type) => {
  return sequelize.define('request', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: type.INTEGER,
    fee: type.INTEGER,
    quantity: type.INTEGER,
    customerId: type.INTEGER,
    insuranceType: type.INTEGER,
    type: type.INTEGER
  }, {
      timestamps: false,
      freezeTableName: true
  });
}