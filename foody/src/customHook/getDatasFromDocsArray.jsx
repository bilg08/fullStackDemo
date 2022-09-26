import { useEffect, useState } from "react";
import { useAgainGetDocs } from "../context/getDataAgainContext";
import { getDocsFromFireBase } from "../firebaseForThisProject/getDocs";
import { useGetDocsFromFireBase } from "./getDocsCustomHook";

export const useGetDatasFromArrayofDoc = (collectionName) => {
  let [data, setData] = useState([]);
 const { againGetDocs } = useAgainGetDocs();
  const getDatas = async () => {
    setData((data = []));
    try {
      const orders = getDocsFromFireBase("foodsOrders");
      orders.then((ordersDatas) =>
        ordersDatas.forEach(async (orderData) => {
          let subOrder = { date: "", orders: [] };
          subOrder.date = orderData.data().date;
          try {
            const collectionUserWantedTo = getDocsFromFireBase(
              `foodsOrders/${orderData.data().date}/${collectionName}`
            );
            (await collectionUserWantedTo).forEach((ThisCollectionItem) => {
              subOrder.orders.push(ThisCollectionItem.data());
            });
          } catch (error) {}

          setData((prevVal) => {
            let prevValACopy = prevVal;
            prevValACopy = [...prevValACopy, subOrder];
            subOrder = {};
            return (prevVal = prevValACopy);
          });
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    getDatas();
  }, [againGetDocs]);
  return data;
};
