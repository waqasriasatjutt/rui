import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import OrderList from './Pages/Orders/index.jsx';
import AddOrder from './AddOrder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<OrderList />} />
        <Route path='/add-order' element={<AddOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
