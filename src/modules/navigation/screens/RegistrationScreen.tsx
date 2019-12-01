import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'modules/store';
import { register, AuthAction } from 'modules/auth';
import { validateEmail } from 'modules/common/index.';
import { AppColor } from 'modules/design';

export const RegistrationScreen: React.FC<NavigationStackScreenProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector((state: ApplicationState) => state.auth.error);

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
            isFocusedPassword
              ? { borderColor: AppColor.DarkPrimary }
              : { borderColor: AppColor.LightPrimary }
          ]}
          multiline={false}
          blurOnSubmit
          secureTextEntry
          autoCapitalize="none"
          value={password}
          placeholder="Password"
          onChangeText={setPassword}
          placeholderTextColor={AppColor.SecondaryText}
        />
      </View>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.registerButtonView}>
        <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function onRegister() {
    if (!email || !password) {
      dispatch(AuthAction.authError('Empty email or password'));
    } else if (!validateEmail(email)) {
      dispatch(AuthAction.authError('Email bad!'));
    } else {
      dispatch(register(email, password));
    }
  }

  function onEmailFocusChange() {
    setIsFocusedEmail(true);
  }

  function onPasswordFocusChange() {
    setIsFocusedPassword(true);
  }

  function onEndEditing() {
    setIsFocusedEmail(false);
    setIsFocusedPassword(false);
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
  registerButtonView: {
    width: '90%'
  },
  registerButton: {
    backgroundColor: AppColor.Primary,
    padding: 10,
    borderRadius: 30,
    alignItems: 'center'
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  error: {
    margin: 5,
    color: 'red',
    fontStyle: 'italic'
  }
});
