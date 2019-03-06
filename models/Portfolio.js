module.exports = function(sequelize, DataTypes) {
  var Portfolio = sequelize.define("Portfolio",{
    // Giving the Users model a name of type STRING
    portfolio:
    {
      type: DataTypes.JSON,
      allowNull: true
    }
  });

  Portfolio.associate = function(models){
      models.Portfolio.belongsTo(models.Users,{
          onDelete: "CASCADE",
          foreignKey:{
            allowNull: true
          }
      })
  }

  return Portfolio;
};
