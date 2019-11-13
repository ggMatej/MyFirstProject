import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo
} from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps
} from 'react-navigation-stack';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native';

import { ApplicationState } from '../modules/ApplicationState';
import { logout } from '../modules/auth/redux/authThunks';
import { getClients } from '../modules/user/redux/userThunks';
import { AppRoute } from '../const/appRoutes';
import { Client } from '../model/Client';

const ClientItem = ({ name, email }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{email}</Text>
    </View>
  );
};

export const ClientScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const dispatch = useDispatch();
  const clients = useSelector((state: ApplicationState) => state.user.clients);

  useEffect(() => {
    getClients(dispatch);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flatlist}>
        <FlatList
          data={clients}
          renderItem={renderListItem}
          keyExtractor={renderKey}
        />
      </SafeAreaView>

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
  function renderKey(item: Client) {
    return item.id;
  }

  function renderListItem(item: ListRenderItemInfo<Client>) {
    return <ClientItem name={item.item.name} email={item.item.email} />;
  }

  function onAddClient() {
    navigation.navigate(AppRoute.AddClient);
  }

  function onLogout() {
    logout(dispatch);
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
    marginVertical: 5
  },
  title: {
    fontSize: 32
  },
  flatlist: {}
});
