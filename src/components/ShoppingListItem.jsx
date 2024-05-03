import React from 'react';
import { Checkbox } from '@shadcn/ui';

export const ShoppingListItem = ({ item, index, togglePurchased, changeQuantity }) => (
  <div className="item-container">
    <Checkbox
      checked={item.purchased}
      onCheckedChange={() => togglePurchased(index)}
    />
    <span className={item.purchased ? 'purchased-text' : 'unpurchased-text'}>
      {item.name}
    </span>
    <input
      className="quantity-input"
      value={item.quantity.toString()}
      onChange={(e) => changeQuantity(index, parseInt(e.target.value, 10))}
      type="number"
    />
  </div>
); 
.item-container {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.purchased-text {
  text-decoration: line-through;
  margin: 0 8px;
}

.unpurchased-text {
  margin: 0 8px;
}

.quantity-input {
  margin-left: auto;
  width: 50px;
  border: 1px solid gray;
  padding: 4px;
  text-align: center;
}