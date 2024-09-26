import { database } from "./firebase";
import { ref, set } from "firebase/database";

export const createTeacher = (teacherData) => {
  const teacherRef = ref(database, "teachers/" + teacherData.name);
  return set(teacherRef, teacherData);
};
