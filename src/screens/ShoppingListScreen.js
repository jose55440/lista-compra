import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import styles from './index.css';

export default function ShoppingListScreen() {
  const [newItem, setNewItem] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  const [userId, setUserId] = useState(''); // Agrega un estado para el userId

  useEffect(() => {
    // Obtener el userId del usuario actual
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('shoppingLists')
      .doc(userId) // Utiliza el userId obtenido
      .onSnapshot((snapshot) => {
        setShoppingList(snapshot.data()?.items || []);
      });

    return unsubscribe;
  }, [userId]);

  const addItem = () => {
    if (newItem.trim()) {
      const newShoppingList = [...shoppingList, { name: newItem, purchased: false, quantity: 1 }];
      setShoppingList(newShoppingList);
      setNewItem('');
      firebase
        .firestore()
        .collection('shoppingLists')
        .doc(userId)
        .set({ items: newShoppingList });
    }
  };

  const togglePurchased = (index) => {
    const updatedList = [...shoppingList];
    updatedList[index].purchased = !updatedList[index].purchased;
    setShoppingList(updatedList);
    firebase
      .firestore()
      .collection('shoppingLists')
      .doc(userId)
      .set({ items: updatedList });
  };

  const changeQuantity = (index, quantity) => {
    const updatedList = [...shoppingList];
    updatedList[index].quantity = quantity;
    setShoppingList(updatedList);
    firebase
      .firestore()
      .collection('shoppingLists')
      .doc(userId)
      .set({ items: updatedList });
  };

  return (
    <View style={styles.shoppingListScreen}>
      <TextInput
        value={newItem}
        onChangeText={setNewItem}
        placeholder="Nuevo item"
        onSubmitEditing={addItem}
        style={styles.shoppingListScreenInput}
      />
      <FlatList
        data={shoppingList}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.shoppingListScreenItem,
              item.purchased ? styles.shoppingListScreenItemPurchased : null,
            ]}
          >
            <Text>{item.name}</Text>
            <View>
              <TouchableOpacity
                onPress={() => togglePurchased(index)}
                style={styles.shoppingListScreenItemButton}
              >
                <Text>{item.purchased ? 'Comprado' : 'Pendiente'}</Text>
              </TouchableOpacity>
              <TextInput
                value={item.quantity.toString()}
                onChangeText={(text) => changeQuantity(index, parseInt(text, 10))}
                keyboardType="numeric"
                style={styles.shoppingListScreenItemQuantity}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}