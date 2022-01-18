import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../types/main';
import firestore from '@react-native-firebase/firestore';

export default () => {
  const { user }: { user: FirebaseAuthTypes.User | null } = useSelector(
    ({ auth }: ReducerTypes) => auth,
  );

  const appointmentDocRef = firestore()
    .collection('userData')
    .doc(user?.uid)
    .collection('appointments');

  const peopleDocRef = firestore()
    .collection('userData')
    .doc(user?.uid)
    .collection('people');

  return { appointmentDocRef, peopleDocRef };
};
