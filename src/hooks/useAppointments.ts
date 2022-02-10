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

  const addAppointment = async (appointment: any) => {
    try {
      const { title, date, endTime, allDay, notes, reminderTime } = appointment;

      const id = await RNCalendarEvents.saveEvent(title, {
        startDate: date.toISOString(),
        endDate: endTime.toISOString(),
        allDay,
        notes,
        alarms: reminderTime ? [{ date: reminderTime.toISOString() }] : [],
      });

      await appointmentDocRef.doc(id).set({ ...appointment, id });
    } catch (error) {
      console.log(error);
    }
  };

  const editAppointment = async (appointment: AppointmentTypes) => {
    try {
      const { id, title, date, endTime, allDay, notes } = appointment;
      await appointmentDocRef.doc(id).update(appointment);

      await RNCalendarEvents.saveEvent(title, {
        id,
        startDate: date.toISOString(),
        endDate: endTime.toISOString(),
        allDay,
        notes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      await appointmentDocRef.doc(id).delete();
      await RNCalendarEvents.removeEvent(id);
    } catch (error) {
      console.log(error);
    }
  };

  // const scheduleReminder = async (appointment: AppointmentTypes) => {

  // }

  return {
    addAppointment,
    editAppointment,
    deleteAppointment,
    getAppointments,
    loading,
  };
};
