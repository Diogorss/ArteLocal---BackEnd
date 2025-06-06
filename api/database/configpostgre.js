import { Sequelize, DataTypes } from 'sequelize'; // Importa DataTypes aqui também
import pg from 'pg'; 
import dotenv from 'dotenv';

// Importa as FUNÇÕES que definem os modelos
import defineUserModel from '../models/User.js';
import defineArtModel from '../models/Art.js';

dotenv.config();



// 1. Inicializa o Sequelize PRIMEIRO
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

// 2. Define os modelos chamando as funções importadas
const User = defineUserModel(sequelize);
const Art = defineArtModel(sequelize);

// 3. Define as associações APÓS os modelos estarem definidos
User.hasMany(Art, { foreignKey: 'userId', as: 'arts' });
Art.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// Função de conexão (sem alterações)
const connect = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Sincroniza após tudo estar definido
    console.log(' PostgreSQL (Neon) connected successfully and models synced.');
  } catch (error) {
    console.error(' Error connecting to PostgreSQL or syncing models:', error);
    process.exit(1);
  }
};

// 4. Exporta a conexão, a instância sequelize E os modelos definidos
export { connect, sequelize, User, Art };
