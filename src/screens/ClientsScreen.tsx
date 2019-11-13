import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ListRenderItemInfo
} from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ApplicationState } from '../modules/ApplicationState';
import { logout } from '../modules/auth/redux/authThunks';
import { getClients } from '../modules/client/redux/clientThunks';
import { AppRoute } from '../const/appRoutes';
import { Client } from '../model/Client';

const ClientItem = ({ client, onPress }) => {
  const { name, email, id } = client;
  return (
    <TouchableOpacity onPress={onPress.bind(null, id)}>
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>{email}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const ClientScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const dispatch = useDispatch();
  const clients = useSelector(
    (state: ApplicationState) => state.client.clients
  );

  useEffect(() => {
    getClients(dispatch);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={clients}
        renderItem={renderListItem}
        keyExtractor={renderKey}
      />

      <View style={styles.buttonView}>
        <View style={styles.button}>
          <Button title="Add client" onPress={onAddClient} />
        </View>
        <View style={styles.button}>
          <Button title="Logout" onPress={onLogout} />
        </View>
      </View>
    </View>
  );

  function renderKey(client: Client) {
    return client.id;
  }

  function renderListItem(item: ListRenderItemInfo<Client>) {
    return <ClientItem client={item.item} onPress={onSelect} />;
  }

  function onAddClient() {
    navigation.navigate(AppRoute.AddClient);
  }

  function onLogout() {
    logout(dispatch);
  }

  function onSelect(id: string) {
    alert(id);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#d9d9d9',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  input: {
    backgroundColor: '#cccccc',
    borderStyle: 'solid',
    borderRadius: 10,
    margin: 5,
    textAlign: 'center'
  },
  button: {
    margin: 5
  },
  buttonView: {
    width: '40%',
    margin: 5
  },
  inputView: {
    width: '70%',
    margin: 10
  },
  text: {
    color: 'black',
    margin: 5
  },
  error: {
    color: 'red',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
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
