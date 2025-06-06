import { DataTypes } from 'sequelize';

// Exporta uma função que define o modelo Art
const defineArtModel = (sequelize) => {
  const Art = sequelize.define('Art', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // userId será adicionado pela associação
  }, {
    tableName: 'arts',
    timestamps: true
  });
  return Art;
};

export default defineArtModel;
