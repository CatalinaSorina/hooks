import React, { useMemo } from "react";
import { Button, List, ListItem, Typography } from "@mui/material";
import { ShoppingCart, DeleteForever, Cancel } from "@mui/icons-material";
import "./styles.scss";

const Cart = ({ cartItems, removePhotoFromCart, removeAll }) => {
  const cartItemsCount = useMemo(() => cartItems.length, [cartItems]);

  return (
    <div className="cart">
      <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
        <ShoppingCart />
        Your Cart{cartItemsCount ? ` (${cartItemsCount})` : null}:
      </Typography>
      {cartItemsCount === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <List className="cartItems">
          {cartItems.map((item) => (
            <ListItem key={item.id} className="cartItem">
              <Button variant="outlined" onClick={() => removePhotoFromCart(item)}>
                <Cancel />
              </Button>
              <p>Photo ID:{item.id}</p>
              <p>By:{item.photographer}</p>
            </ListItem>
          ))}
        </List>
      )}

      {cartItemsCount > 0 && (
        <Button variant="outlined" onClick={removeAll}>
          Clear Cart
          <DeleteForever />
        </Button>
      )}
    </div>
  );
};

export default Cart;
