import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const getDocsFromFireBase = async(collectionName) => {
 
    const datas = await getDocs(collection(db, collectionName));
    return datas
      
};
