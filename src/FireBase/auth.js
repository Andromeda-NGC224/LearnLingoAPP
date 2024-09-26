import { auth, database } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";

export const register = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    await set(ref(database, "users/" + user.uid), {
      name: name,
      email: email,
    });
    console.log("Succesfully registered!");
    return user;
  } catch (error) {
    console.error("Error registration:", error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log("Succesfully login!");
    return response;
  } catch (error) {
    console.error("Error loginization:", error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await signOut(auth);
    console.log("Succesfully logout!");
    return response;
  } catch (error) {
    console.error("Error of logout:", error.message);
    throw error;
  }
};

export const onAuthStateChangedListener = async (callback) => {
  const response = await onAuthStateChanged(auth, callback);
  return response;
};
