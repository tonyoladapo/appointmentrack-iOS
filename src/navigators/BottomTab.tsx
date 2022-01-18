import React, { useCallback, useMemo, useRef } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';
import BottomSheet from '@gorhom/bottom-sheet';
import Calendar from '../screens/bottomTabs/Calendar';
import Home from '../screens/bottomTabs/Home';
import More from '../screens/bottomTabs/More';
import People from '../screens/bottomTabs/People';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['50%', '80%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => bottomSheetRef.current?.snapToIndex(0)}
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
        <Tab.Screen name="People" component={People} />
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="More" component={More} />
      </Tab.Navigator>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}>
        <View>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </>
  );
};

export default BottomTab;
