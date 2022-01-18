import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface ReducerTypes {
  auth: AuthReducer;
  pref: PrefReducer;
  people: PeopleReducer;
}

interface AuthReducer {
  user: FirebaseAuthTypes.User | null;
}

interface PrefReducer {
  firstRun: boolean;
}

interface PeopleReducer {
  people: any[];
}
