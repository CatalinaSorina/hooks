import { useState, useEffect } from "react";
import axios from "axios";

function usePhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("https://api.pexels.com/v1/curated?per_page=10", {
          headers: {
            Authorization: process.env.REACT_APP_PEXELS_API_KEY,
          },
        });

        const data = response.data;
        const imageUrls = data.photos.map(({ id, alt, src: { original }, photographer }) => ({
          id,
          alt,
          src: original,
          photographer,
          isInCart: false,
        }));

        setPhotos(imageUrls);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  const updatePhoto = (updatedPhoto) => {
    setPhotos((prevPhotos) => {
      // Find the index of the photo to update
      const photoIndex = prevPhotos.findIndex((photo) => photo.id === updatedPhoto.id);

      if (photoIndex !== -1) {
        // Create a new array with the updated photo
        const updatedPhotos = [...prevPhotos];
        updatedPhotos[photoIndex] = updatedPhoto;
        return updatedPhotos;
      }

      return prevPhotos;
    });
  };

  const updatePhotos = (updatedProps) => {
    setPhotos((prevPhotos) => {
      // Create a new array with updated prop values for all photos
      const updatedPhotos = prevPhotos.map((photo) => ({
        ...photo,
        ...updatedProps,
      }));
      return updatedPhotos;
    });
  };

  return { photos, loading, error, updatePhoto, updatePhotos };
}

export default usePhotos;
