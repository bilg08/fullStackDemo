import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Layout} from './LayOut.jsx';
import {OrdersPage} from './pages/index.jsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="OrdersPage" element={<OrdersPage/>} />
            <Route path="about" element={<h1>This is about</h1>} />
            <Route path="about1" element={<h1>This is about1</h1>} />
            <Route path="*" element={<h1>404 NOT FOUND</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
