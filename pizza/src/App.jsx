import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AdminMainPages from "./adminPages/pages/AdminMainPages"
import AdminUpload from "./adminPages/pages/AdminUpload"
import AdminLogin from "./adminPages/pages/AdminLogin"
import AdminRegistration from "./adminPages/pages/AdminRegistration"
import ProtectedRoute from "./auth/ProtectedRoute"
import { AuthProvider } from "./auth/AuthContext"
import { CartProvider } from './userPages/components/cartContext';
import AdminOrderingPages from "./adminPages/pages/AdminOrderingPages"
import AdminOrderingEdit from "./adminPages/pages/AdminOrderingEdit"
import Layout from './userPages/layout/Layout';
import LayoutMenu from './userPages/layout/LayoutMenu';
import LayoutBasket from './userPages/layout/LayoutBasket';
import LayoutOrderDone from'./userPages/layout/LayoutOrderDone';

function App() {
  return (  
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <Router>
            <div>
              <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route path="/adminregistration" element={<AdminRegistration />} />
                <Route path="/adminmain" element={<ProtectedRoute element={<AdminMainPages />} />} />
                <Route path="/adminupload" element={<ProtectedRoute element={<AdminUpload />} />} />
                <Route path="/adminordering" element={<ProtectedRoute element={<AdminOrderingPages />} />} />
                <Route path="/adminorderingedit" element={<ProtectedRoute element={<AdminOrderingEdit />} />} />
                <Route path="/usermain" element={<Layout />} />
                <Route path="/menu" element={<LayoutMenu />} />
                <Route path="/basket" element={<LayoutBasket />} />
                <Route path="/orderdone" element={<LayoutOrderDone />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
