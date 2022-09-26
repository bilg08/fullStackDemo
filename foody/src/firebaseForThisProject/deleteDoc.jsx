import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseForThisProject/firebase";

export const deleteDocOfFirebase = async (path) => {
  await deleteDoc(doc(db, path));
};
