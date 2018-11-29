module.exports = (sequelize, type) => {
  return sequelize.define('shipping_request', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    location: type.TEXT,
    weight: type.FLOAT,
    destinationAddress: type.TEXT,
    courierId: type.INTEGER
  }, {
      timestamps: false,
      freezeTableName: true
    });
}