// src/db/models/TreatmentPhase.js
import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Treatment from './treatment.js';

const TreatmentPhase = sequelize.define('TreatmentPhase', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  treatment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 20
  },
  red_start_intensity: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  blue_start_intensity: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  red_end_intensity: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  blue_end_intensity: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  start_frequency: {
    type: DataTypes.INTEGER,
    defaultValue: 660
  },
  end_frequency: {
    type: DataTypes.INTEGER,
    defaultValue: 660
  },
  phase_order: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  modelName: 'TreatmentPhase',
  tableName: 'treatment_phases',
  timestamps: false,
});

Treatment.hasMany(TreatmentPhase, {
  foreignKey: 'treatment_id',
});

TreatmentPhase.belongsTo(Treatment, {
  foreignKey: 'treatment_id',
});

export default TreatmentPhase;