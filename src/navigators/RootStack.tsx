import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../types/main';
import { Modalize } from 'react-native-modalize';
import auth from '@react-native-firebase/auth';
import useAuth from '../hooks/useAuth';
import Setup from '../screens/rootStack/Setup';
import Main from '../screens/rootStack/Main';
import AppiontmentDetails from '../screens/rootStack/AppiontmentDetails';
import PersonDetails from '../screens/rootStack/PersonDetails';
import CreateAppointment from '../screens/rootStack/CreateAppointment';
import PersonPickerModal from '../components/modals/PersonPickerModal';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const { user } = useSelector(({ auth }: ReducerTypes) => auth);
  const modalRef = useRef<Modalize>(null);

  const { authStateListener } = useAuth();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authStateListener);
    return subscriber;
  }, []);

  return (
    <>
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
              <Stack.Screen
                name="CreateAppointment"
                component={CreateAppointment}
                initialParams={{
                  modalRef,
                }}
              />
              <Stack.Screen name="PersonDetails" component={PersonDetails} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>

      <PersonPickerModal modalRef={modalRef} />
    </>
  );
};

export default RootStack;
