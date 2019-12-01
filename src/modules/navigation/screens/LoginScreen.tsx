import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from 'modules/store';
import { login, facebookLogin, AuthAction, setUser } from 'modules/auth';
import { firebase } from '@react-native-firebase/auth';
import { validateEmail } from 'modules/common/index.';
import { AppColor } from 'modules/design';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AppRoute } from '..';

export const LoginScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const authError = useSelector((state: ApplicationState) => state.auth.error);
  const dispatch = useDispatch();

  firebase.auth().onAuthStateChanged(_user => {
    if (_user) {
      dispatch(setUser(_user));
      navigation.navigate(AppRoute.Home);
    }
  });

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
      <Text style={styles.error}>{authError}</Text>
      <View style={styles.loginButtonView}>
        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.forgotPasswordAndRegisterView}>
        <Text style={styles.text} onPress={onForgotPassword}>
          Forgot password?
        </Text>
        <Text style={styles.text} onPress={onRegister}>
          Don't have an account?{' '}
          <Text
            style={{
              color: AppColor.Primary,
              fontWeight: 'bold',
              fontSize: 18
            }}
          >
            Register!
          </Text>
        </Text>
      </View>
      <View style={styles.facebookButtonView}>
        <TouchableOpacity
          style={styles.facebookButton}
          onPress={onFacebookLogin}
        >
          <Text style={styles.facebookLoginButtonText}>Facebook login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function onRegister() {
    dispatch(AuthAction.authError(''));
    navigation.navigate(AppRoute.Registration);
  }

  function onLogin() {
    if (!email || !password) {
      dispatch(AuthAction.authError('Empty email or password'));
    } else if (!validateEmail(email)) {
      dispatch(AuthAction.authError('Email bad!'));
    } else {
      dispatch(login(email, password));
    }
  }

  function onForgotPassword() {
    // TODO
  }

  function onFacebookLogin() {
    dispatch(facebookLogin());
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
    marginTop: 100,
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
  loginButtonView: {
    width: '90%'
  },
  loginButton: {
    backgroundColor: AppColor.Primary,
    padding: 10,
    borderRadius: 30,
    alignItems: 'center'
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  forgotPasswordAndRegisterView: {
    width: '90%',
    alignItems: 'center',
    marginTop: 20
  },
  text: {
    color: AppColor.SecondaryText,
    margin: 5
  },
  facebookButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center'
  },
  facebookLoginButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  facebookButtonView: {
    width: '90%',
    marginTop: 100
  },
  error: {
    margin: 5,
    color: 'red',
    fontStyle: 'italic'
  }
});
