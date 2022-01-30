import React, { useCallback, useMemo, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerTypes } from '../../types/main';
import { useNavigation } from '@react-navigation/native';
import { setPickedPerson } from '../../actions/appointment';
import BottomSheet from '@gorhom/bottom-sheet';
import CreatePerson from '../../components/bottomsheets/CreatePersonBottomSheet';

const PersonPicker = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { people } = useSelector(({ people }: ReducerTypes) => people);
  const dispatch = useDispatch();

  const { goBack } = useNavigation();

  const snapPoints = useMemo(() => ['50%', '90%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <View>
        <TouchableOpacity
          onPress={() => bottomSheetRef.current?.snapToIndex(0)}>
          <Text>Create Person</Text>
        </TouchableOpacity>
        <FlatList
          data={people}
          keyExtractor={({ id }, index) => `${index}-${id}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                dispatch(setPickedPerson(item));
                goBack();
              }}
              style={{
                padding: 16,
                backgroundColor: 'tomato',
                marginVertical: 2,
              }}>
              <Text>{item.firstName}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}>
        <CreatePerson bottomSheetRef={bottomSheetRef} fromPicker={true} />
      </BottomSheet>
    </>
  );
};

export default PersonPicker;

const styles = StyleSheet.create({});
