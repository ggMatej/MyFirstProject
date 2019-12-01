import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { sendEmail } from 'modules/common/index.';
import { Project } from 'modules/projects';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from 'modules/store';
import { createSelector } from 'reselect';
import { addReview, Review } from 'modules/reviews';

import { AppRoute } from '../const/app-routes';
import { AppColor } from 'modules/design';

export const ReviewScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const [isFocusedTitle, setIsFocusedTitle] = useState(false);
  const [isFocusedReview, setIsFocuesdReview] = useState(false);

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
          onFocus={onTitleFocusChange}
          onEndEditing={onEndEditing}
          style={[
            styles.input,
            isFocusedTitle
              ? { borderColor: AppColor.DarkPrimary }
              : { borderColor: AppColor.LightPrimary }
          ]}
          blurOnSubmit
          multiline={false}
          value={title}
          placeholder="Title"
          onChangeText={setTitle}
          placeholderTextColor={AppColor.SecondaryText}
        />
        <TextInput
          onFocus={onReviewFocusChange}
          onEndEditing={onEndEditing}
          style={[
            styles.input,
            isFocusedReview
              ? { borderColor: AppColor.DarkPrimary }
              : { borderColor: AppColor.LightPrimary }
          ]}
          multiline={true}
          numberOfLines={15}
          blurOnSubmit
          value={review}
          placeholder="Review"
          onChangeText={setReview}
          placeholderTextColor={AppColor.SecondaryText}
        />
      </View>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.sendEmailButtonView}>
        <View style={styles.sendEmailButton}>
          <TouchableOpacity style={styles.sendEmailButton} onPress={onSendMail}>
            <Text style={styles.emailButtonText}>Send email</Text>
          </TouchableOpacity>
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

  function onTitleFocusChange() {
    setIsFocusedTitle(true);
  }

  function onReviewFocusChange() {
    setIsFocuesdReview(true);
  }

  function onEndEditing() {
    setIsFocuesdReview(false);
    setIsFocusedTitle(false);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: AppColor.White,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputView: {
    width: '80%'
  },
  input: {
    color: AppColor.PrimaryText,
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    textAlign: 'center',
    padding: 5
  },
  sendEmailButtonView: {
    width: '90%'
  },
  sendEmailButton: {
    backgroundColor: AppColor.Primary,
    padding: 5,
    borderRadius: 30,
    alignItems: 'center'
  },
  emailButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  error: {
    margin: 5,
    color: 'red',
    fontStyle: 'italic'
  },
  picker: {
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    width: '30%'
  }
});
