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
import useAppointments from '../../hooks/useAppointments';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const { getAppointments, appointments, loading, addAppointment } =
    useAppointments();

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

const Item = ({ item }: any) => {
  const { navigate } = useNavigation<RootNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigate('AppointmentDetails', { item })}
      style={{ padding: 16, backgroundColor: 'tomato', marginVertical: 2 }}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
