import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const CERTS_COL = collection(db, "certifications");

export const getCertifications = async () => {
    const snap = await getDocs(CERTS_COL);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const addCertification = async (data) => {
    await addDoc(CERTS_COL, data);
};

export const deleteCertification = async (id) => {
    await deleteDoc(doc(db, "certifications", id));
};
