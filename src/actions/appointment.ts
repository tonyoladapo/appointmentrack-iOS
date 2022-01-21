import { AppointmentTypes } from '../types/appointment';

export const setAppointments = (appointments: AppointmentTypes[]) => {
  return {
    type: 'SET_APPOINTMENTS',
    payload: appointments,
  };
};
