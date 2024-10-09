import { database } from "../FireBase/firebase";
import { ref, set } from "firebase/database";

export const updateFavouritesInDB = async (userId, favourites) => {
  const userRef = ref(database, `/users/${userId}/favourites`);
  await set(userRef, favourites);
};
