const assignTreatmentID = (treatmentID, treatmentPhases) => {
  // Create a copy of the array and assign treatment_id to each phase
  return treatmentPhases.map(phase => ({
    ...phase,
    treatment_id: treatmentID
  }));
}

export {assignTreatmentID};