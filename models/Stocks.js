module.exports = function(sequelize, DataTypes) {
  var Stocks = sequelize.define("Stocks",{
    // Giving the Users model a name of type STRING
    ticker: {
      type: DataTypes.CHAR,
      primaryKey: true
    },

    sharholder_name:  {
      type: DataTypes.STRING,
      allowNull: true,
    },

    next_earning_date:
    {
      type: DataTypes.DATEONLY,
      allowNull: true,
    }
  });

  return Stocks;
};