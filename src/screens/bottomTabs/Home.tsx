import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../types/navigation';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/main';
import { AppointmentTypes } from '../../types/appointment';
import useAppointments from '../../hooks/useAppointments';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const { getAppointments, loading, addAppointment } = useAppointments();
  const { appointments } = useSelector(
    ({ appointment }: ReducerTypes) => appointment,
  );

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => auth().signOut()}>
        <Text>Sign out</Text>
      </TouchableOpacity>

      <FlatList
        data={appointments}
        keyExtractor={({ id }, index) => `${index}-${id}`}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  );
};

interface Props {
  item: AppointmentTypes;
}

const Item = ({ item }: Props) => {
  const { navigate } = useNavigation<RootNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigate('AppointmentDetails', { item })}
      style={{ padding: 16, backgroundColor: 'tomato', marginVertical: 2 }}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
