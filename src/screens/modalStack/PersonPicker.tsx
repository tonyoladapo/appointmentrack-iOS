import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setPickedPerson } from '../../actions/appointment';
import { PersonTypes } from '../../types/appointment';
import { ReducerTypes } from '../../types/main';
import { useNavigation } from '@react-navigation/native';
import { ModalNavigationProp } from '../../types/navigation';

const PersonPicker = () => {
  const { people } = useSelector(({ people }: ReducerTypes) => people);

  return (
    <View style={styles.container}>
      <FlatList
        data={people}
        keyExtractor={({ id, firstName }, index) =>
          `${id}-${firstName}-${index}`
        }
        ListHeaderComponent={<AddPerson />}
        renderItem={({ item }) => <Item person={item} />}
      />
    </View>
  );
};

const AddPerson = () => {
  const { navigate } = useNavigation<ModalNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigate('CreatePerson')}>
      <Text>Create new contact</Text>
    </TouchableOpacity>
  );
};

const Item = ({ person }: { person: PersonTypes }) => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation<ModalNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        dispatch(setPickedPerson(person));
        goBack();
      }}>
      <Text>{person.firstName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  item: {
    padding: 16,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
});

export default PersonPicker;
