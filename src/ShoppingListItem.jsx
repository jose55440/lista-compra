import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Checkbox, Button, buttonVariants } from '@shadcn/ui';

export default function ShoppingListItem({ item, index, togglePurchased, changeQuantity }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <Checkbox
        checked={item.purchased}
        onCheckedChange={() => togglePurchased(index)}
        style={{ marginRight: 8 }}
      />
      <Text style={{ flex: 1, textDecorationLine: item.purchased ? 'line-through' : 'none' }}>
        {item.name}
      </Text>
      <TextInput
        value={item.quantity.toString()}
        onChangeText={(text) => changeQuantity(index, parseInt(text, 10))}
        keyboardType="numeric"
        style={{ width: 60, borderWidth: 1, borderColor: 'gray', padding: 4, marginHorizontal: 8 }}
      />
      <Button
        variant="ghost"
        className={buttonVariants({ variant: item.purchased ? 'secondary' : 'default' })}
        onPress={() => togglePurchased(index)}
      >
        {item.purchased ? 'Comprado' : 'Pendiente'}
      </Button>
    </View>
  );
}