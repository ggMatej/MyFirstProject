import React, {useEffect} from 'react';
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from 'react-navigation-hooks';

import {AppRoute} from '../const/appRoutes';
import {Client} from '../model/Client';
import {logout} from '../modules/auth/redux/authThunks';
import {ClientItem} from '../modules/client/components/clientItem';
import {getClients} from '../modules/client/redux/clientThunks';
import {ApplicationState} from '../modules/store/models/ApplicationState';

export const ClientScreen: React.FC<NavigationStackScreenProps> = ({
  navigation,
}) => {
  const clients = useSelector(
    (state: ApplicationState) => state.client.clients,
  );
  console.log('ClientScreen:', clients);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFocused && !clients.length) {
      dispatch(getClients());
    }
  }, [clients, isFocused, dispatch]);

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
    navigation.navigate(AppRoute.AddClients);
  }

  function onLogout() {
    dispatch(logout());
  }

  function onClientItemSelect(client: Client) {
    navigation.navigate(AppRoute.ClientProjects, {client});
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#d9d9d9',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#cccccc',
    borderStyle: 'solid',
    borderRadius: 10,
    margin: 5,
    textAlign: 'center',
  },
  button: {
    margin: 5,
  },
  buttonView: {
    width: '40%',
    margin: 5,
  },
  inputView: {
    width: '70%',
    margin: 10,
  },
  text: {
    color: 'black',
    margin: 5,
  },
  error: {
    color: 'red',
    margin: 5,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#cccccc',
    padding: 5,
    marginVertical: 5,
    width: 300,
  },
  title: {
    fontSize: 25,
  },
});
