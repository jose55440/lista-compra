import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';

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
    <View>
      <Text>Ingresa tu número de teléfono:</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}