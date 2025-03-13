import {ipcMain} from 'electron';
import Treatment from '../../db/models/treatment.js';
import TreatmentPhase from '../../db/models/treatment-phase.js';
import insertDefaultData from "../../db/init-db.js";

insertDefaultData();

const initTreatmentsHandlers = () => {
  ipcMain.handle('treatments-create', async (event, {name, description, phases}) => {
    const treatment = await Treatment.create({name, description});
    for (const phase of phases) {
      await TreatmentPhase.create({...phase, treatment_id: treatment.id});
    }
    return treatment;
  });

  ipcMain.handle('treatments-get', async (event, params) => {
    const options = {
      include: [{
        model: TreatmentPhase
      }],
      nest: true
    };
    if (params) {
      options['where'] = params;
    }
    const treatments = await Treatment.findAll(options);
    if (params?.id) {
      return treatments[0]?.toJSON() ?? null;
    }
    return treatments.map(t => t.toJSON());
  });

  ipcMain.handle('treatments-update', async (event, {id, name, description, phases}) => {
    await Treatment.update({name, description}, {where: {id}});
    await TreatmentPhase.destroy({where: {TreatmentId: id}});

    const existingPhases = await TreatmentPhase.findAll({where: {TreatmentId: id}});
    const existingPhaseIds = existingPhases.map(p => p.id);
    const newPhaseIds = phases.map(p => p.id).filter(id => id);

    for (const phase of phases) {
      if (phase.id) {
        await TreatmentPhase.update(phase, {where: {id: phase.id}});
      } else {
        await TreatmentPhase.create({...phase, TreatmentId: id});
      }
    }

    const phasesToDelete = existingPhaseIds.filter(id => !newPhaseIds.includes(id));
    if (phasesToDelete.length) {
      await TreatmentPhase.destroy({where: {id: phasesToDelete}});
    }
  });

  ipcMain.handle('treatments-delete', async (event, id) => {
    await TreatmentPhase.destroy({where: {TreatmentId: id}});
    await Treatment.destroy({where: {id}});
  });
}

export default initTreatmentsHandlers;