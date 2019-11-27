import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { sendEmail } from 'modules/common/index.';
import { Project } from 'modules/projects';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from 'modules/store';
import { createSelector } from 'reselect';
import { addReview, Review } from 'modules/reviews';

import { AppRoute } from '../const/app-routes';

export const ReviewScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  const project: Project = navigation.getParam('project');

  const clientSelector = createSelector(
    (state: ApplicationState) => state.client.clients,
    _clients => _clients.filter(_client => _client.id === project.clientId)
  );

  const dispatch = useDispatch();
  const clients = useSelector(clientSelector);
  const client = clients[0];

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          keyboardType="email-address"
          value={title}
          placeholder="Title"
          style={styles.input}
          onChangeText={setTitle}
        />
        <TextInput
          multiline={true}
          numberOfLines={15}
          style={styles.input}
          value={review}
          placeholder="Review"
          onChangeText={setReview}
        />
      </View>

      <Text style={styles.error}>{error}</Text>
      <View style={styles.buttonView}>
        <View style={styles.button}>
          <Button color="black" title="Send mail" onPress={onSendMail} />
        </View>
      </View>
    </View>
  );

  function onSendMail() {
    if (!title || !review) {
      setError('No empty fields!');
      return;
    }
    sendEmail(client.email, title, review).then(() => {
      console.log('Email sent!'),
        navigation.navigate(AppRoute.ProjectDetails),
        dispatch(addReview(new Review(title, review, project.id)));
    });
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
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
  }
});
