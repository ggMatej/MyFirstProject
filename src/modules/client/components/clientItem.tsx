import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Client } from '../../../model/Client';

interface Props {
  client: Client;
  onPress: (item: Client) => void;
}

export const ClientItem: React.FC<Props> = ({ client, onPress }) => {
  const { name, email } = client;

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>{email}</Text>
      </View>
    </TouchableOpacity>
  );

  function handleOnPress() {
    onPress(client);
  }
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#cccccc',
    padding: 5,
    marginVertical: 5,
    width: 300
  },
  title: {
    fontSize: 25
  }
});
