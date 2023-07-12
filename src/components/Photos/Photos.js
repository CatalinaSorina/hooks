import React from "react";
import { Typography, Button } from "@mui/material";
import { Close, AddCircle } from "@mui/icons-material";
import "./styles.scss";

const Photos = ({ photos, loading, error, addToCart, removeFromCart }) => (
  <div className="photosContainer">
    {loading ? (
      <Typography variant="body1">Loading photos...</Typography>
    ) : error ? (
      <Typography variant="body1">Error loading photos: {error}</Typography>
    ) : photos?.length ? (
      <div className="photos">
        {photos.map(({ id, alt, photographer, src, isInCart }) => {
          const photo = { id, alt, photographer, src };

          return (
            <div key={id} className="photo">
              <h2>{photographer}</h2>
              <img src={src} alt={alt} />
              {isInCart ? (
                <Button variant="outlined" onClick={() => removeFromCart(photo)}>
                  Remove from Cart <Close />
                </Button>
              ) : (
                <Button variant="contained" onClick={() => addToCart(photo)}>
                  Add to Cart <AddCircle />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    ) : (
      <Typography variant="body1">No photos</Typography>
    )}
  </div>
);

export default Photos;
