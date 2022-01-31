import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Modalize } from 'react-native-modalize';
import { ReducerTypes } from '../../types/main';
import { PersonTypes } from '../../types/appointment';
import { setPickedPerson } from '../../actions/appointment';

interface Props {
  modalRef: React.RefObject<Modalize>;
}

const PersonPickerModal = ({ modalRef }: Props) => {
  const { height } = useWindowDimensions();
  const modalHeight = height * 0.7;

  const { people } = useSelector(({ people }: ReducerTypes) => people);

  return (
    <Modalize
      ref={modalRef}
      modalHeight={modalHeight}
      flatListProps={{
        data: people,
        keyExtractor: ({ id }, index) => `${index}-${id}`,
        renderItem: ({ item }) => <Item person={item} modalRef={modalRef} />,
      }}
    />
  );
};

const Item = ({
  person,
  modalRef,
}: {
  person: PersonTypes;
  modalRef: React.MutableRefObject<Modalize | null>;
}) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        dispatch(setPickedPerson(person));
        modalRef.current?.close();
      }}>
      <Text>{person.firstName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
});

export default PersonPickerModal;
