import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface ReducerTypes {
  auth: AuthReducer;
  pref: PrefReducer;
}

interface AuthReducer {
  user: FirebaseAuthTypes.User | null;
}

interface PrefReducer {
  firstRun: boolean;
}
