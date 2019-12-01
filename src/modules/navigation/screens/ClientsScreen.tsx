import React, { useEffect } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Client, ClientItem, getClients } from 'modules/clients';
import { ApplicationState } from 'modules/store';
import { firebase } from '@react-native-firebase/auth';
import { AppColor } from 'modules/design';

import { AppRoute } from '..';

export const ClientScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const dispatch = useDispatch();

  const clients = useSelector(
    (state: ApplicationState) => state.client.clients
  );

  if (!firebase.auth().currentUser) navigation.navigate(AppRoute.Login);

  useEffect(() => {
    dispatch(getClients());
    navigation.setParams({ addClient });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={clients}
        renderItem={renderListItem}
        keyExtractor={renderKey}
      />
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

  function addClient() {
    navigation.navigate(AppRoute.AddClient);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.White,
    alignItems: 'stretch'
  }
});
