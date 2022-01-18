import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../types/main';
import auth from '@react-native-firebase/auth';
import useAuth from '../hooks/useAuth';
import Setup from '../screens/rootStack/Setup';
import Main from '../screens/rootStack/Main';
import AppiontmentDetails from '../screens/rootStack/AppiontmentDetails';
import PersonDetails from '../screens/rootStack/PersonDetails';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const { user } = useSelector(({ auth }: ReducerTypes) => auth);

  const { authStateListener } = useAuth();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authStateListener);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name="Setup"
            component={Setup}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AppointmentDetails"
              component={AppiontmentDetails}
            />
            <Stack.Screen name="PersonDetails" component={PersonDetails} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
