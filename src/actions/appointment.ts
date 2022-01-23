import { PersonTypes } from './../types/appointment';
import { AppointmentTypes } from '../types/appointment';

export const setAppointments = (appointments: AppointmentTypes[]) => {
  return {
    type: 'SET_APPOINTMENTS',
    payload: appointments,
  };
};

export const setPickedPerson = (pickedPerson: PersonTypes | null) => {
  return {
    type: 'SET_PICKED_PERSON',
    payload: pickedPerson,
  };
};
