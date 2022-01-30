import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';
import { Modalize } from 'react-native-modalize';
import Calendar from '../screens/bottomTabs/Calendar';
import Home from '../screens/bottomTabs/Home';
import More from '../screens/bottomTabs/More';
import People from '../screens/bottomTabs/People';
import CreateAppointmentModal from '../components/modals/CreateAppointment';
import CreatePersonModal from '../components/modals/CreatePerson';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => {
  const appointmentModal = useRef<Modalize>(null);
  const personModal = useRef<Modalize>(null);

  return (
    <>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => appointmentModal.current?.open()}
                style={styles.headerBtn}>
                <Text>Create</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="People"
          component={People}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => personModal.current?.open()}
                style={styles.headerBtn}>
                <Text>Create</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="More" component={More} />
      </Tab.Navigator>

      <CreateAppointmentModal modalRef={appointmentModal}>
        <Text>Text</Text>
      </CreateAppointmentModal>

      <CreatePersonModal modalRef={personModal}>
        <Text>Text</Text>
      </CreatePersonModal>
    </>
  );
};

const styles = StyleSheet.create({
  headerBtn: {
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTab;
