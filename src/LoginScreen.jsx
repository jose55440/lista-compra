import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Button as ShadcnButton, buttonVariants } from '@shadcn/ui';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    try {
      // Crear un usuario temporal en Firebase
      const userCredential = await firebase.auth().signInAnonymously();
      const user = userCredential.user;

      // Navegar a la pantalla de lista de compras
      navigation.navigate('ShoppingList', { userId: user.uid, username });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Ingresa tu nombre de usuario:</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, borderColor: 'gray', padding: 8, marginBottom: 16, width: '80%' }}
      />
      <ShadcnButton
        variant="default"
        className={buttonVariants({ variant: 'secondary' })}
        onPress={handleLogin}
      >
        Iniciar sesión
      </ShadcnButton>
    </View>
  );
}