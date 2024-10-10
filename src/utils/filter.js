import { database } from "../FireBase/firebase";
import { ref, set } from "firebase/database";

export const updateFavouritesInDB = async (userId, favourites) => {
  const userRef = ref(database, `/users/${userId}/favourites`);
  await set(userRef, favourites);
};

export const filterTeachers = (teachers, filters) => {
  return teachers.filter((teacher) => {
    if (filters.languages && filters.languages !== "") {
      if (
        !teacher.languages.some(
          (lang) => lang.toLowerCase() === filters.languages.toLowerCase()
        )
      ) {
        return false;
      }
    }
    if (filters.level && filters.level !== "") {
      if (
        !teacher.levels.some(
          (level) => level.toLowerCase() === filters.level.toLowerCase()
        )
      ) {
        return false;
      }
    }
    if (filters.price && filters.price !== "") {
      if (teacher.price_per_hour < parseInt(filters.price)) {
        return false;
      }
    }
    return true;
  });
};
