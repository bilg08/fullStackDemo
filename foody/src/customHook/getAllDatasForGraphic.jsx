import { useEffect, useState } from "react";
import { getDocsFromFireBase } from "../firebaseForThisProject/getDocs";

export const useGetAllOrdersDetails = () => {
    const [count,setCount]=useState(0)
    const [data, setData] = useState({
        totalProfit: 0,
        ordersLength: 0,
        shippedOrderslength: 0,
        returnedOrdersLength: 0,
        ordersDateArray: [],
        ordersDataArray: [],
      });
    const getData = async () => {
      setCount(0)
        try {
          const ordersOfFoods = await getDocsFromFireBase('foodsOrders');
          let counter = 0;

          ordersOfFoods.forEach(async (order) => {
            
            try {
              const getAllOrdersLength = await getDocsFromFireBase(
                `foodsOrders/${order.data().date}/ThisDayOrders`
              );
              const getAllShippedOrderLength = await getDocsFromFireBase(
                `foodsOrders/${order.data().date}/shippedOrders`
              );
              getAllShippedOrderLength.forEach((order) => {
                setData((prevVal) => {
                  let prevValACopy = prevVal;
                  prevValACopy.shippedOrderslength++;
                  return (prevVal = prevValACopy);
                });
              });
              getAllOrdersLength.forEach((order) => {
                setData((prevVal) => {
                  let prevValACopy = prevVal;
                  counter++;
                  prevValACopy.ordersLength++;
                  return (prevVal = prevValACopy);
                });
              });
            } catch (error) {}

            /*************************************************************************** */
            
            setData((prevVal) => {
              //Нийт ашигийг нэмнэ
              let prevValACopy = prevVal;
              prevValACopy.totalProfit += order.data().totalProfit;
              return (prevVal = prevValACopy);
            });
            /*************************************************************************** */

            setCount((prevVal) => {
              let prevValACopy = prevVal;
              prevValACopy++;
              return prevValACopy;
            });
            setData((prevVal) => {
              
              let prevValACopy = prevVal;
              prevValACopy.ordersDataArray = [
                ...prevValACopy.ordersDataArray,
                counter,
              ];
              counter = 0;
              return prevValACopy;
            });
          })
    } catch (error) {}
    }
    useEffect(() => {
        getData();
        return(()=>
          
        setData(
        {
          totalProfit: 0,
          ordersLength: 0,
          shippedOrderslength: 0,
          returnedOrdersLength: 0,
          ordersDateArray: [],
          ordersDataArray: [],
        })
      
        )
    }, [])
    return data
    
}