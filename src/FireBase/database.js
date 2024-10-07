import { database } from "./firebase";
import { ref, set, get } from "firebase/database";

export const createTeacher = (teacherData) => {
  const teacherRef = ref(database, "teachers/" + teacherData.name);
  console.log(teacherRef, teacherData);
  return set(teacherRef, teacherData);
};

export const getTeachers = async () => {
  try {
    const teachersRef = ref(database, "teachers");
    const snapshot = await get(teachersRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error getting teachers:", error);
    throw error;
  }
};
