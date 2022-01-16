import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const setUser = (user: FirebaseAuthTypes.User | null) => ({
  type: 'SET_USER',
  payload: user,
});
