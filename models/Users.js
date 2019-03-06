module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users",{
    // Giving the Users model a name of type STRING
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    user_name:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args:[6],
          msg:"Username must least 6 characters in length"
        }
      }
    },
    password:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      } 
    },
  });

  return Users;
};
