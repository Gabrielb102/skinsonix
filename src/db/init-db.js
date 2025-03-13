// src/db/default-data.js
import sequelize from './config.js';
import Treatment from './models/treatment.js';
import TreatmentPhase from './models/treatment-phase.js';

const insertDefaultData = async () => {

  await sequelize.sync()

  try {

    console.log('Checking if treatments exist');

    const treatmentCount = await Treatment.count();

    if (treatmentCount > 0) {
      console.log('Treatments already exist, skipping default data insertion');
      return;
    }

    console.log('Creating treatments');

    await sequelize.transaction(async (t) => {
      // Create default treatments
      const completeFacial = await Treatment.create({
        name: 'Complete Facial',
        description: 'Full facial treatment for comprehensive skin care',
      }, { transaction: t });

      const brightEyes = await Treatment.create({
        name: 'Bright Eyes',
        description: 'Treatment focused on the eye area for rejuvenation',
      }, { transaction: t });

      const superSmile = await Treatment.create({
        name: 'Super Smile',
        description: 'Treatment focused on lips and jaw area for a radiant smile',
      }, { transaction: t });

      // Create phases for Complete Facial
      await TreatmentPhase.bulkCreate([
        { treatment_id: completeFacial.id, area: 'upRightSide', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 1 },
        { treatment_id: completeFacial.id, area: 'forehead', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 2 },
        { treatment_id: completeFacial.id, area: 'upLeftSide', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 3 },
        { treatment_id: completeFacial.id, area: 'jowlLeft', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 4 },
        { treatment_id: completeFacial.id, area: 'chin', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 5 },
        { treatment_id: completeFacial.id, area: 'jowlRight', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 6 },
        { treatment_id: completeFacial.id, area: 'upperLip', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 7 },
        { treatment_id: completeFacial.id, area: 'nose', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 8 },
        { treatment_id: completeFacial.id, area: 'neckLeft', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 9 },
        { treatment_id: completeFacial.id, area: 'neckRight', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 10 },

      // Create phases for Bright Eyes
        { treatment_id: brightEyes.id, area: 'upRightSide', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 1 },
        { treatment_id: brightEyes.id, area: 'forehead', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 2 },
        { treatment_id: brightEyes.id, area: 'upLeftSide', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 3 },
        { treatment_id: brightEyes.id, area: 'nose', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 8 },

      // Create phases for Super Smile
        { treatment_id: superSmile.id, area: 'jowlLeft', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 4 },
        { treatment_id: superSmile.id, area: 'chin', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 5 },
        { treatment_id: superSmile.id, area: 'jowlRight', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 6 },
        { treatment_id: superSmile.id, area: 'upperLip', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 7 },
        { treatment_id: superSmile.id, area: 'neckLeft', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 9 },
        { treatment_id: superSmile.id, area: 'neckRight', duration: 120, red_start_intensity: 100, blue_start_intensity: 100, red_end_intensity: 100, blue_end_intensity: 100, start_frequency: 620, end_frequency: 630, phase_order: 10 }
      ], { transaction: t });

      console.log('Default treatments and phases inserted successfully');
    });
  } catch (error) {
    console.error('Error inserting default data:', error);
  }
};

export default insertDefaultData;