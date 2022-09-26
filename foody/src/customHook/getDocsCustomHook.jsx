import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAgainGetDocs } from "../context/getDataAgainContext";
import { db } from "../firebaseForThisProject/firebase";

export const useGetDocsFromFireBase = (collectionName) => {
  let [data, setDatas] = useState([]);
  const { againGetDocs, setAgainGetDocs } = useAgainGetDocs();
  const getData = async () => {
    try {
      const datas = await getDocs(collection(db, collectionName));
      datas.forEach((e) => {
        setDatas((prevVal) => {
          let prevValACopy = prevVal;
          prevValACopy = [...prevValACopy, e.data()];
          return (prevVal = prevValACopy);
        });
      });
    } catch (error) {}
  };

  useEffect(() => {
    getData();
    return(()=>setDatas([]))
  }, [againGetDocs]);
  return [data];
};
