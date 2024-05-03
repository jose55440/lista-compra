// ShoppingListScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { ShoppingListItem } from '../components/ShoppingListItem';
import styles from './index.css';

export default function ShoppingListScreen() {
  const [newItem, setNewItem] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('shoppingLists')
      .doc('userId') // Reemplazar con el ID del usuario actual
      .onSnapshot((snapshot) => {
        setShoppingList(snapshot.data().items || []);
      });

    return unsubscribe;
  }, []);

  const addItem = () => {
    if (newItem.trim()) {
      const newShoppingList = [...shoppingList, { name: newItem, purchased: false, quantity: 1 }];
      setShoppingList(newShoppingList);
      setNewItem('');
      firebase
        .firestore()
        .collection('shoppingLists')
        .doc('userId')
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
      .doc('userId')
      .set({ items: updatedList });
  };

  const changeQuantity = (index, quantity) => {
    const updatedList = [...shoppingList];
    updatedList[index].quantity = quantity;
    setShoppingList(updatedList);
    firebase
      .firestore()
      .collection('shoppingLists')
      .doc('userId')
      .set({ items: updatedList });
  };

  return (
    <View className={styles['shopping-list-screen']}>
      <TextInput
        value={newItem}
        onChangeText={setNewItem}
        placeholder="Nuevo item"
        onSubmitEditing={addItem}
        className={styles['shopping-list-screen__input']}
      />
      <FlatList
        data={shoppingList}
        renderItem={({ item, index }) => (
          <View className={`${styles['shopping-list-screen__item']} ${item.purchased ? styles['shopping-list-screen__item--purchased'] : ''}`}>
            <Text>{item.name}</Text>
            <View>
              <TouchableOpacity
                onPress={() => togglePurchased(index)}
                className={styles['shopping-list-screen__item-button']}
              >
                <Text>{item.purchased ? 'Comprado' : 'Pendiente'}</Text>
              </TouchableOpacity>
              <TextInput
                value={item.quantity.toString()}
                onChangeText={(text) => changeQuantity(index, parseInt(text, 10))}
                keyboardType="numeric"
                className={styles['shopping-list-screen__item-quantity']}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}