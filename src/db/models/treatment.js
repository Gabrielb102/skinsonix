// src/db/models/Treatment.js
import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Treatment = sequelize.define('Treatment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'Treatment',
  tableName: 'treatments',
  timestamps: false,
});

export default Treatment;