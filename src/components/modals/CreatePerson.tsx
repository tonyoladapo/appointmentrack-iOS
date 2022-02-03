import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Modalize } from 'react-native-modalize';

interface Props {
  modalRef: React.RefObject<Modalize>;
}

const CreatePerson = ({ modalRef }: Props) => {
  const { height } = useWindowDimensions();
  const modalHeight = height * 0.9;

  return <Modalize ref={modalRef} modalHeight={modalHeight}></Modalize>;
};

const styles = StyleSheet.create({});

export default CreatePerson;
