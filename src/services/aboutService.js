import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const ABOUT_DOC = doc(db, "about", "main");

export const getAbout = async () => {
    const snapshot = await getDoc(ABOUT_DOC);
    if (snapshot.exists()) {
        return snapshot.data();
    }
    return null;
};

export const saveAbout = async (content) => {
    await setDoc(ABOUT_DOC, { content }, { merge: true });
};
