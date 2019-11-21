import React, { useEffect } from 'react';
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'modules/auth';
import { Client, ClientItem, getClients } from 'modules/clients';
import { ApplicationState } from 'modules/store';

import { AppRoute } from '..';

export const ClientScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const clients = useSelector(
    (state: ApplicationState) => state.client.clients
  );
  console.log('klijenti clientScreen:', clients);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClients());
  }, [clients]);

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
    return <ClientItem onPress={onClientSelected} client={item.item} />;
  }

  function onClientSelected(client: Client) {
    navigation.navigate(AppRoute.ClientDetails, { client });
  }

  function onAddClient() {
    navigation.navigate(AppRoute.AddClient);
  }

  // NIsam siguran jel ovo dobro?
  function onLogout() {
    dispatch(logout());
    navigation.navigate(AppRoute.Login);
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
