
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/configpostgre.js';

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
  // userId field will be automatically added by Sequelize due to the association
  // defined externally (e.g., in database config or main app file)
}, {
  tableName: 'arts', // Explicitly define table name for clarity
  timestamps: true // Keep consistent with the User model
});

// Associations should be defined after all models are imported/defined.
// Typically in a central place like the database initialization file.

export default Art;

