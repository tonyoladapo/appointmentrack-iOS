import { PersonTypes } from './../types/appointment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPeople } from '../actions/people';
import firestoreDocRef from '../firebase/firestoreDocRef';
import uuid from 'react-native-uuid';

export default () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { peopleDocRef } = firestoreDocRef();

  const getPeople = async () => {
    try {
      peopleDocRef.onSnapshot(querySnapshot => {
        if (!querySnapshot) return;

        const data: PersonTypes[] = [];

        querySnapshot.forEach((doc: any) => {
          data.push(doc.data());
        });

        setLoading(false);
        dispatch(setPeople(data));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addPerson = async (person: any) => {
    try {
      const id = uuid.v4().toString();
      await peopleDocRef.doc(id).set({ ...person, id });
      return id;
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

  return { getPeople, addPerson, editPerson, deletePerson, loading };
};
