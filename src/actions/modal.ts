export const toggleCreateAppointmentModal = (modalState: boolean) => {
  return {
    type: 'TOGGLE_APPOINTMENT_MODAL',
    payload: modalState,
  };
};

export const toggleCreatePersonModal = (modalState: boolean) => {
  return {
    type: 'TOGGLE_PERSON_MODAL',
    payload: modalState,
  };
};
