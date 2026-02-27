
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getProjects = async () => {
  const querySnapshot = await getDocs(collection(db, "projects"));
  const projects = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return projects;
};
