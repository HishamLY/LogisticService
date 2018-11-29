module.exports = (sequelize, type) => {
  return sequelize.define('warehouse', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    address: type.TEXT,
    capacity: type.INTEGER,
    availability: type.INTEGER
  }, {
      timestamps: false,
      freezeTableName: true
  });
}