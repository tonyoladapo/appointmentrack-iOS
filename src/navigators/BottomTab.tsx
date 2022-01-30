import React, { useRef } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';
import BottomSheet from '@gorhom/bottom-sheet';
import Calendar from '../screens/bottomTabs/Calendar';
import Home from '../screens/bottomTabs/Home';
import More from '../screens/bottomTabs/More';
import People from '../screens/bottomTabs/People';
import CreateAppointmentBottomSheet from '../components/bottomsheets/CreateAppointmentBottomSheet';
import CreatePersonBottomSheet from '../components/bottomsheets/CreatePersonBottomSheet';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => {
  const appointmentBottomSheet = useRef<BottomSheet>(null);
  const personBottomSheet = useRef<BottomSheet>(null);

  return (
    <>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => appointmentBottomSheet.current?.snapToIndex(0)}
                style={{
                  paddingHorizontal: 16,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
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
                onPress={() => personBottomSheet.current?.snapToIndex(0)}
                style={{
                  paddingHorizontal: 16,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>Create</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="More" component={More} />
      </Tab.Navigator>

      <CreateAppointmentBottomSheet bottomSheetRef={appointmentBottomSheet} />
      <CreatePersonBottomSheet bottomSheetRef={personBottomSheet} />
    </>
  );
};

export default BottomTab;
