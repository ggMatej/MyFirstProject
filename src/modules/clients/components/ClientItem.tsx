import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppColor } from 'modules/design';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native';

import { Client } from '..';

interface Props {
  client: Client;
  onPress: (item: Client) => void;
}

export const ClientItem: React.FC<Props> = ({ client, onPress }) => {
  const { name, email } = client;

  return (
    <TouchableOpacity style={styles.touchable} onPress={handleOnPress}>
      <View style={styles.container}>
        <Icon
          name="user-circle"
          color={AppColor.DarkPrimary}
          size={20}
          style={{ padding: 5 }}
        />
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.container}>
        <Icon
          name="envelope"
          color={AppColor.DarkPrimary}
          size={20}
          style={{ padding: 5 }}
        />
        <Text style={styles.text}>{email}</Text>
      </View>
    </TouchableOpacity>
  );

  function handleOnPress() {
    onPress(client);
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 5,
    color: AppColor.PrimaryText
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  touchable: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    borderBottomWidth: 3,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 0.5,
    borderColor: AppColor.LightPrimary,
    borderRadius: 10
  }
});
