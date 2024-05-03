// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import styles from './index.css';

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = async () => {
    try {
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber);
      // Manejar el código de verificación y navegar a la pantalla de lista de compras
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className={styles['login-screen']}>
      <Text className={styles['login-screen__title']}>Ingresa tu número de teléfono:</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        className={styles['login-screen__input']}
      />
      <Button
        title="Iniciar sesión"
        onPress={handleLogin}
        className={styles['login-screen__button']}
      />
    </View>
  );
}