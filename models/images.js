module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define("Image", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    coordinates: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1]
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return Image;
};
