import React, { useState, useCallback } from "react";
import { Typography, styled } from "@mui/material";
import usePhotos from "./hooks/usePhotos";
import FriendsStatus from "./components/FriendStatus/FriendsStatus";
import Photos from "./components/Photos/Photos";
import Cart from "./components/Cart/Cart";

const RootContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "calc(100vh - 40px)",
  padding: "20px",
  textAlign: "center",
  cursor: "default",
});

function App() {
  const [cartItems, setCartItems] = useState([]);
  const { photos, loading: loadingPhotos, error: errorPhotos, updatePhoto, updatePhotos } = usePhotos();

  const handleAddToCart = useCallback(
    (photo) => {
      setCartItems((prevCartItems) => [...prevCartItems, photo]);
      updatePhoto({ ...photo, isInCart: true });
    },
    [updatePhoto],
  );

  const handleRemoveFromCart = useCallback(
    (photo) => {
      setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== photo.id));
      updatePhoto({ ...photo, isInCart: false });
    },
    [updatePhoto],
  );

  const handleClearAll = useCallback(() => {
    setCartItems([]);
    updatePhotos({ isInCart: false });
  }, [updatePhotos]);

  return (
    <RootContainer>
      <Typography variant="h4">Welcome!</Typography>
      <Typography variant="h4">You can add photos to your cart:</Typography>
      <Photos
        photos={photos}
        loading={loadingPhotos}
        error={errorPhotos}
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
      />
      <Cart cartItems={cartItems} removePhotoFromCart={handleRemoveFromCart} removeAll={handleClearAll} />
      <FriendsStatus />
    </RootContainer>
  );
}

export default App;
