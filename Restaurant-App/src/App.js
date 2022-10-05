import './App.css';
import {Routes, Route} from 'react-router-dom';
import Homepage from './components/Homepage';
import SigninPage from './components/SigninPage';
import RegisterPage from './components/RegisterPage';
import MenuPage from './components/MenuPage';
import Profile from './components/Profile';
import Orders from './components/Orders';
import Addresses from './components/Addresses';
import ChangePassword from './components/ChangePassword';
import CartCheckout from './components/CartCheckout';
import ItemDetail from './components/ItemDetail';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <Routes>
      <Route path='/home' element={<Homepage/>}/>
      <Route path='/itemdetail' element={<ItemDetail/>}/>
      <Route path='/' element={<SigninPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/menu' element={<MenuPage/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/editprofile' element={<EditProfile/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/addresses' element={<Addresses/>}/>
      <Route path='/change-password' element={<ChangePassword/>}/>
      <Route path='/cart-checkout' element={<CartCheckout/>}/>
      <Route path="*" element={<main><p>There's nothing here!</p></main>}></Route>
    </Routes>
  );
}

export default App;
