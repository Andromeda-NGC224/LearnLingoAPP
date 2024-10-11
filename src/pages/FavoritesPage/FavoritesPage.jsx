import { TeachersList } from "../../components/TeachersList/TeachersList.jsx";
import css from "./FavoritesPage.module.css";
import { useAuth } from "../../utils/AuthContext.jsx";
import { getFavourites } from "../../FireBase/database.js";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { userId } = useAuth();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favs = await getFavourites(userId);
        setFavourites(favs || []);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };
    fetchFavorites();
  }, [userId]);

  const handleFavouritesChange = (updatedFavourites) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((fav) => fav !== updatedFavourites)
    );
  };

  return (
    <section className={css.mainSection}>
      <TeachersList
        favouritesFromProps={favourites}
        onFavouritesChange={handleFavouritesChange}
        isFavoritesPage={true}
      />
    </section>
  );
}
