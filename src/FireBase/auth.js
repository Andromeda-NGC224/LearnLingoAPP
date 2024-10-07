import { auth, database } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";

export const getAccessToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

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
    localStorage.setItem("token", user.accessToken);
    console.log("Succesfully registered!", user);
    // const token = await getIdToken(user);

    return user;
  } catch (error) {
    console.error("Error registration:", error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log("Succesfully login!", response);
    localStorage.setItem("token", response.user.accessToken);

    return response;
  } catch (error) {
    console.error("Error loginization:", error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await signOut(auth);
    console.log("Succesfully logout!", response);
    return response;
  } catch (error) {
    console.error("Error of logout:", error.message);
    throw error;
  }
};
