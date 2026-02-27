import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const RESUME_COL = collection(db, "resume");

export const getResume = async () => {
    const snap = await getDocs(RESUME_COL);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const addResume = async (data) => {
    await addDoc(RESUME_COL, data);
};

export const deleteResume = async (id) => {
    await deleteDoc(doc(db, "resume", id));
};
