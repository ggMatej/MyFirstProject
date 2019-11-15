import React, { useEffect, useCallback } from 'react';
import { useIsFocused, useFocusEffect } from 'react-navigation-hooks';
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

import { ApplicationState } from '../modules/ApplicationState';
import { logout } from '../modules/auth/redux/authThunks';
import { getClients } from '../modules/client/redux/clientThunks';
import { AppRoute } from '../const/appRoutes';
import { Client } from '../model/Client';
import { ClientItem } from '../modules/client/components/clientItem';
import { getProjects } from '../modules/projects/redux/projectThunks';

export const ClientScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const clients = useSelector(
    (state: ApplicationState) => state.client.clients
  );

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!clients.length && isFocused) {
      dispatch(getClients());
    }
  }, [clients, dispatch, isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={clients}
        renderItem={renderListItem}
        keyExtractor={renderKey}
      />
      <Text>{clients.length}</Text>
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
    return <ClientItem client={item.item} onPress={onClientItemSelect} />;
  }

  function onAddClient() {
    navigation.navigate(AppRoute.AddClient);
  }

  function onLogout() {
    dispatch(logout());
  }

  function onClientItemSelect(client: Client) {
    navigation.navigate(AppRoute.ClientProjects, { client });
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
