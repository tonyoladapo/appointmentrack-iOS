import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppointmentTypes } from '../types/appointment';
import { setAppointments } from '../actions/appointment';
import firestoreDocRef from '../firebase/firestoreDocRef';
import RNCalendarEvents from 'react-native-calendar-events';

export default () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { appointmentDocRef } = firestoreDocRef();

  const getAppointments = async () => {
    try {
      appointmentDocRef.onSnapshot(querySnapshot => {
        if (!querySnapshot) return;

        const data: AppointmentTypes[] = [];

        querySnapshot.forEach((doc: any) => {
          data.push(doc.data());
        });

        dispatch(setAppointments(data));
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addAppointment = async (appointment: AppointmentTypes) => {
    try {
      const { id, title, date, endTime, allDay, notes } = appointment;
      await appointmentDocRef.doc(id).set({ ...appointment, id });

      await RNCalendarEvents.saveEvent(title, {
        startDate: date.toISOString(),
        endDate: endTime.toISOString(),
        allDay,
        notes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editAppointment = async (appointment: AppointmentTypes) => {
    try {
      await appointmentDocRef.doc(appointment.id).update(appointment);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      await appointmentDocRef.doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addAppointment,
    editAppointment,
    deleteAppointment,
    getAppointments,
    loading,
  };
};
