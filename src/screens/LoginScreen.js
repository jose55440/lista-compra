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
    <View style={styles.loginScreen}>
      <Text style={styles.loginScreenTitle}>Ingresa tu número de teléfono:</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.loginScreenInput}
      />
      <Button
        title="Iniciar sesión"
        onPress={handleLogin}
        style={styles.loginScreenButton}
      />
    </View>
  );
}