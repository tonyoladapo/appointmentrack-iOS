import { useState } from 'react';
import firestoreDocRef from '../firebase/firestoreDocRef';
import uuid from 'react-native-uuid';

export default () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { appointmentDocRef } = firestoreDocRef();

  const getAppointments = async () => {
    try {
      appointmentDocRef.onSnapshot(querySnapshot => {
        if (!querySnapshot) return;

        const data: any[] = [];

        querySnapshot.forEach(doc => {
          data.push(doc.data());
        });

        setAppointments(data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //TODO:Change appointment type
  const addAppointment = async (appointment: any) => {
    try {
      const id = uuid.v4().toString();
      await appointmentDocRef.doc(id).set({ ...appointment, id });
    } catch (error) {
      console.log(error);
    }
  };

  //TODO:Change appointment type
  const editAppointment = async (appointment: any) => {
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
    appointments,
    loading,
  };
};
