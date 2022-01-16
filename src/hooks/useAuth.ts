import { useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/auth';

export default () => {
  const [initializing, setInitializing] = useState(true);
  const [authenticating, setAuthenticating] = useState(false);

  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    try {
      setAuthenticating(true);
      GoogleSignin.configure({
        webClientId:
          '936707825177-4m4fsn5tk8vv17bgtmhatqhm8l9ih96h.apps.googleusercontent.com',
      });

      const { idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(credential);
    } catch (error) {
      console.error(error);
    }
  };

  const signInAnonymously = async () => {
    try {
      setAuthenticating(true);
      await auth().signInAnonymously();
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const authStateListener = (user: FirebaseAuthTypes.User | null) => {
    dispatch(setUser(user));
    if (initializing) setInitializing(false);
    setAuthenticating(false);
  };

  return {
    signInWithGoogle,
    signInAnonymously,
    signOut,
    authStateListener,
    initializing,
    authenticating,
  };
};
