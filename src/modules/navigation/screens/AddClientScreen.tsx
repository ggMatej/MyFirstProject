import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { addClient, Client, getClients } from 'modules/clients';
import { validateEmail } from 'modules/common/index.';
import { AppColor } from 'modules/design';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AppRoute } from '..';

export const AddClientScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedName, setIsFocusedName] = useState(false);

  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          onFocus={onEmailFocusChange}
          onEndEditing={onEndEditing}
          style={[
            styles.input,
            isFocusedEmail
              ? { borderColor: AppColor.DarkPrimary }
              : { borderColor: AppColor.LightPrimary }
          ]}
          blurOnSubmit
          multiline={false}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          placeholder="Email"
          onChangeText={setEmail}
          placeholderTextColor={AppColor.SecondaryText}
        />
        <TextInput
          onFocus={onPasswordFocusChange}
          onEndEditing={onEndEditing}
          style={[
            styles.input,
            isFocusedName
              ? { borderColor: AppColor.DarkPrimary }
              : { borderColor: AppColor.LightPrimary }
          ]}
          multiline={false}
          blurOnSubmit
          value={name}
          placeholder="Name"
          onChangeText={setName}
          placeholderTextColor={AppColor.SecondaryText}
        />
      </View>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.addClientButtonView}>
        <View style={styles.clientButton}>
          <TouchableOpacity style={styles.clientButton} onPress={onAddClient}>
            <Text style={styles.clientButtonText}>Add client</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  function onAddClient() {
    if (!email || !name) {
      setError('Empty email or password');
    } else if (!validateEmail(email)) {
      setError('Bad email!');
    } else {
      dispatch(addClient(new Client(name, email)));
      dispatch(getClients());
      navigation.navigate(AppRoute.Clients);
    }
  }

  function onEmailFocusChange() {
    setIsFocusedEmail(true);
  }

  function onPasswordFocusChange() {
    setIsFocusedName(true);
  }

  function onEndEditing() {
    setIsFocusedEmail(false);
    setIsFocusedName(false);
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
  addClientButtonView: {
    width: '90%'
  },
  clientButton: {
    backgroundColor: AppColor.Primary,
    padding: 5,
    borderRadius: 30,
    alignItems: 'center'
  },
  clientButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  error: {
    margin: 5,
    color: 'red',
    fontStyle: 'italic'
  }
});
