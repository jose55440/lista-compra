import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Checkbox } from '@shadcn/ui';

export const ShoppingListItem = ({ item, index, togglePurchased, changeQuantity }) => (
  <View style={styles.itemContainer}>
    <Checkbox
      checked={item.purchased}
      onCheckedChange={() => togglePurchased(index)}
    />
    <Text style={item.purchased ? styles.purchasedText : styles.unpurchasedText}>
      {item.name}
    </Text>
    <TextInput
      style={styles.quantityInput}
      value={item.quantity.toString()}
      onChangeText={(text) => changeQuantity(index, parseInt(text, 10))}
      keyboardType="numeric"
    />
  </View>
);

const styles = {
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  purchasedText: {
    textDecorationLine: 'line-through',
    marginHorizontal: 8,
  },
  unpurchasedText: {
    marginHorizontal: 8,
  },
  quantityInput: {
    marginLeft: 'auto',
    width: 50,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 4,
    textAlign: 'center',
  },
};