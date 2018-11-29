module.exports = (sequelize, type) => {
  return sequelize.define('warehousing_request', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    warehouseId: type.INTEGER,
    startDate: type.DATEONLY,
    endDate: type.DATEONLY
  }, {
      timestamps: false,
      freezeTableName: true
    });
}