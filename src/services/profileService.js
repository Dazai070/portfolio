import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const PROFILE_DOC = doc(db, "profile", "main");

export const getProfile = async () => {
    const snapshot = await getDoc(PROFILE_DOC);
    if (snapshot.exists()) return snapshot.data();
    return null;
};

export const saveProfile = async (data) => {
    await setDoc(PROFILE_DOC, data, { merge: true });
};
