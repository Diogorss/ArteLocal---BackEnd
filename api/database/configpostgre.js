
import { Sequelize } from 'sequelize';
import pg from 'pg'; 
import dotenv from 'dotenv';

// Import models
import User from '../models/User.js';
import Art from '../models/Art.js';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
  logging: false,
});

// Define associations after models are imported/defined
User.hasMany(Art, { foreignKey: 'userId', as: 'arts' });
Art.belongsTo(User, { foreignKey: 'userId', as: 'author' });

const connect = async () => {
  try {
    await sequelize.authenticate();
    // Use { alter: true } or { force: true } during development if needed, 
    // but be cautious in production.
    await sequelize.sync(); 
    console.log(' PostgreSQL (Neon) connected successfully and models synced.');
  } catch (error) {
    console.error(' Error connecting to PostgreSQL or syncing models:', error);
    process.exit(1);
  }
};

export { connect, sequelize };

