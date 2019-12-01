import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  TouchableOpacity
} from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'modules/store';
import { addProject, Project, getProjects } from 'modules/projects';
import { AppColor } from 'modules/design';

import { AppRoute } from '..';

export const AddProjectScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const clients = useSelector(
    (state: ApplicationState) => state.client.clients
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState(clients[0].id);
  const [error, setError] = useState('');
  const [isFocusedTitle, setIsFocusedTitle] = useState(false);
  const [isFocusedDesc, setIsFOcusedDesc] = useState(false);

  const dispatch = useDispatch();
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
          onFocus={onDescFocusChange}
          onEndEditing={onEndEditing}
          style={[
            styles.input,
            isFocusedDesc
              ? { borderColor: AppColor.DarkPrimary }
              : { borderColor: AppColor.LightPrimary }
          ]}
          multiline={false}
          blurOnSubmit
          value={description}
          placeholder="Description"
          onChangeText={setDescription}
          placeholderTextColor={AppColor.SecondaryText}
        />
      </View>
      <Text style={styles.error}>{error}</Text>
      <Picker
        selectedValue={clientId}
        style={styles.picker}
        onValueChange={setClientId}
      >
        {clients.map((item, index) => {
          return <Picker.Item label={item.name} value={item.id} key={index} />;
        })}
      </Picker>
      <View style={styles.addProjectButtonView}>
        <View style={styles.projectButton}>
          <TouchableOpacity style={styles.projectButton} onPress={onAddProject}>
            <Text style={styles.projectButtonText}>Add project</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  function onAddProject() {
    if (!title || !description) {
      setError('Title or description empty!');
      return;
    }
    dispatch(addProject(new Project(title, description, clientId)));
    dispatch(getProjects());
    navigation.navigate(AppRoute.Projects);
  }
  function onTitleFocusChange() {
    setIsFocusedTitle(true);
  }

  function onDescFocusChange() {
    setIsFOcusedDesc(true);
  }

  function onEndEditing() {
    setIsFOcusedDesc(false);
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
  addProjectButtonView: {
    width: '90%'
  },
  projectButton: {
    backgroundColor: AppColor.Primary,
    padding: 5,
    borderRadius: 30,
    alignItems: 'center'
  },
  projectButtonText: {
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
