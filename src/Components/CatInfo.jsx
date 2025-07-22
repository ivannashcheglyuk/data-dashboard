import { useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_CAT_API_KEY

const CatInfo = ({ id, name }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchCatImage = async () => {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`, {
          headers: { "x-api-key": API_KEY },
        });
        const data = await response.json();
        if (data && data[0] && data[0].url) {
          setImageUrl(data[0].url);
        }
      } catch (error) {
        console.error("Failed to fetch cat image:", error);
      }
    };

    fetchCatImage();
  }, [id]);

  return (
    <li className="main-list" key={id}>
      {imageUrl && (
        <img
          className="icons"
          src={imageUrl}
          alt={`Image of ${name} cat breed`}
          style={{ width: 40, height: 40, objectFit: "cover", marginRight: 8 }}
        />
      )}
      {name}
    </li>
  );
};

export default CatInfo;