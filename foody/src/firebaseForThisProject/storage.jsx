import { db, storage } from "./firebase";
import { getStorage,getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { useFoodsDatasContext } from "../context/foodsContext";
import { setDocToFirebase } from "./setDoc";
import { doc, getDoc } from "firebase/firestore";

export const uploadImageToFirebase = async (
  file,
  foodName,
) => {
  const storageRef = sRef(storage, `foods/${foodName}`);
  await uploadBytes(storageRef, file).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then(async (url) => {
      await setDocToFirebase(`foods/${foodName}`, {
        img: url,
      }).then(async() => {
        const a = await getDoc(doc(db, `foods/${foodName}`)); 
      })
    });
  });
};
