import React, { useState } from 'react';
import { firestore } from './firebase';

export const RegisterUser = () => {
  const [userName, setUserName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear un nuevo documento para el usuario en Firestore
      const userRef = await firestore.collection('users').add({
        name: userName,
        tasks: []
      });

      // Restablecer el estado del formulario
      setUserName('');
      console.log('Usuario registrado con ID:', userRef.id);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <div>
      <h2>Registrar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};