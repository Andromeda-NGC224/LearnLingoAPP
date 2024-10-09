import { database } from "./firebase";
import { ref, set, get } from "firebase/database";

export const createTeacher = (teacherData) => {
  const teacherRef = ref(database, "teachers/" + teacherData.name);
  console.log(teacherRef, teacherData);
  return set(teacherRef, teacherData);
};

export const getFavourites = async (userId) => {
  try {
    const favouritesRef = ref(database, `users/${userId}/favourites`);
    const snapshot = await get(favouritesRef);
    if (snapshot.exists()) {
      const favouritesData = snapshot.val();
      return favouritesData;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error getting favourites:", error);
    throw error;
  }
};
export const getTeachers = async (count, startAfter) => {
  try {
    const teachersRef = ref(database, "teachers");
    const snapshot = await get(teachersRef);
    if (snapshot.exists()) {
      const teachers = snapshot.val();
      const teacherArray = teachers;
      const startIndex = startAfter ? startAfter : 0;
      const paginatedTeachers = teacherArray.slice(
        startIndex,
        startIndex + count
      );
      return paginatedTeachers;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting teachers:", error);
    throw error;
  }
};
