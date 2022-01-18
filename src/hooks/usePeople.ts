import { useState } from 'react';
import firestoreDocRef from '../firebase/firestoreDocRef';
import uuid from 'react-native-uuid';

export default () => {
  const [people, setPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { peopleDocRef } = firestoreDocRef();

  const getPeople = async () => {
    try {
      peopleDocRef.onSnapshot(querySnapshot => {
        if (!querySnapshot) return;

        const data: any[] = [];

        querySnapshot.forEach(doc => {
          data.push(doc.data());
        });

        setPeople(data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addPerson = async (person: any) => {
    try {
      const id = uuid.v4().toString();
      await peopleDocRef.doc(id).set({ ...person, id });
    } catch (error) {
      console.log(error);
    }
  };

  const editPerson = async (person: any) => {
    try {
      await peopleDocRef.doc(person.id).update(person);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePerson = async (id: string) => {
    try {
      await peopleDocRef.doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };

  return { getPeople, addPerson, editPerson, deletePerson, people, loading };
};
