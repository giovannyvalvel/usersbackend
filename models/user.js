// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // Definición de atributos del modelo
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    // Opciones del modelo
    timestamps: false,
    tableName: 'USERS',
    freezeTableName: true,
  });

  return User;
};
