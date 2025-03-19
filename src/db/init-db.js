// src/db/default-data.js
import sequelize from './config.js';
import Treatment from './models/treatment.js';
import TreatmentPhase from './models/treatment-phase.js';
import {assignTreatmentID} from "./treatments/treatments.js";
import maturePhases from "./treatments/mature.js";
import testPhases from "./treatments/test-treatment.js";

const testing = false;

const insertDefaultData = async () => {

  await sequelize.sync({force: true});

  try {

    console.log('Creating treatments');

    await sequelize.transaction(async (t) => {
      // Create default treatments
      const treatmentData = [
        {name: 'Mature', description: ''},
        {name: 'Rosacea', description: ''},
        {name: 'Acne', description: ''},
        {name: 'Pigmentation', description: ''},
        {name: 'Healing', description: ''},
      ]

      if (testing) {
        treatmentData.push({name: 'Test Treatment', description: 'This is a test treatment'})
      }

      const [
        matureFacial,
        rosaceaFacial,
        acneFacial,
        pigmentationFacial,
        healingFacial
      ] = await Treatment.bulkCreate(treatmentData, {transaction: t});

      const matureTreatmentPhases = assignTreatmentID(matureFacial.id, maturePhases);

      const treatmentPhaseData = [
        ...matureTreatmentPhases,
        ...assignTreatmentID(rosaceaFacial.id, maturePhases),
        ...assignTreatmentID(acneFacial.id, maturePhases),
        ...assignTreatmentID(pigmentationFacial.id, maturePhases),
        ...assignTreatmentID(healingFacial.id, maturePhases)
      ]

      if (testing) {
        treatmentPhaseData.push(...assignTreatmentID(6, testPhases))
      }

      // Create phases for Complete Facial
      await TreatmentPhase.bulkCreate(treatmentPhaseData, {transaction: t});

      console.log('Default treatments and phases inserted successfully');
    });
  } catch (error) {
    console.error('Error inserting default data:', error);
  }
};

export default insertDefaultData;