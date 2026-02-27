import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const SKILLS_COL = collection(db, "skills");

export const getSkills = async () => {
    const snapshot = await getDocs(SKILLS_COL);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const addSkill = async (name, category = "Other") => {
    await addDoc(SKILLS_COL, { name, category });
};

export const deleteSkill = async (id) => {
    await deleteDoc(doc(db, "skills", id));
};
