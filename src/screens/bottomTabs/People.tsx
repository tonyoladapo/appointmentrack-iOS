import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ReducerTypes } from '../../types/main';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../types/navigation';
import usePeople from '../../hooks/usePeople';

const People = () => {
  const { people } = useSelector(({ people }: ReducerTypes) => people);
  const { getPeople, loading, addPerson } = usePeople();

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={people}
        keyExtractor={({ id }, index) => `${index}-${id}`}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  );
};

const Item = ({ item }: any) => {
  return (
    <TouchableOpacity
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

export default People;
