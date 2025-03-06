// src/db/sequelize.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/db/skinsonix.db',
  logging: false
});

export default sequelize;