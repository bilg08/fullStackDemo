import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout.jsx";
import { OrderPage } from './pages/orderPage';
import './App.css'
import { Menu } from "./pages/Menu.jsx";
import { Graphic } from "./pages/graphic";
import {useIsAdminLoggedContext} from "./context/isAdminLoggedContext"
import SignInSide from "./pages/loginPage.jsx";
function App() {
  const {isAdminLogged}=useIsAdminLoggedContext()
  return (
    <Routes>
      {isAdminLogged === true ? 
        <Route path="/" element={<Layout />}>
          <Route path="OrdersPage" element={<OrderPage />} />
          <Route path="Menu" element={<Menu />} />
          <Route path="graphic" element={<Graphic />} />
          <Route path="*" element={<h1>404 NOT FOUND</h1>} />
        </Route>
       :
          <Route path="/" element={<SignInSide />} />
      }
    </Routes>
  );
}

export default App;
