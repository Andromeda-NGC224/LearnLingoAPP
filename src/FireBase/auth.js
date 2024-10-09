import { auth, database } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";

export const getAccessToken = async () => {
  return new Promise((resolve) => {
    const token = localStorage.getItem("token");

    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({ token, userId: user.uid });
      } else {
        localStorage.removeItem("token");
        resolve({ token: null, userId: null });
      }
    });
  });
};

export const register = async (name, email, password, updateUserId) => {
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
    updateUserId(user.uid);
    // const token = await getIdToken(user);

    return { userId: user.uid, user };
  } catch (error) {
    console.error("Error registration:", error.message);
    throw error;
  }
};

export const login = async (email, password, updateUserId) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;
    console.log("Succesfully login!", user.uid);
    localStorage.setItem("token", response.user.accessToken);

    updateUserId(user.uid);

    return { userId: user.uid, user };
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
