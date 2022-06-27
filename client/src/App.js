import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import MainLayout from './layouts/MainLayout';
import Main from './pages/main/Main';
import Kanban from "./pages/kanban/Kanban";

// admin
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
import AdminMember from './pages/admin/member/AdminMember';
import AdminAuth from './pages/admin/auth/AdminAuth';
import AdminProduct from './pages/admin/product/AdminProduct';
import AdminInquery from './pages/admin/inquery/AdminInquery';
import AdminStatistics from './pages/admin/statistics/AdminStatistics';

// import "./assets/themes/soho/soho-dark/theme.css";  //theme
import "./assets/themes/soho/soho-dark/theme.scss"; //theme
// require('./assets/themes/soho/soho-dark/theme.scss');  //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "./App.css";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Login/>} />
          <Route path="/signup" element={ <Signup/> } />
          <Route path="/main" element={ <MainLayout/>} >
            <Route path="kanban" element={<Kanban />} />
            <Route index element={ <Main/> } />
          </Route>

          {/* admin */}
          <Route path="/admin" element={ <AdminLayout/>}>
            <Route index element={ <AdminDashboard/> }/>
            <Route path="member" element={ <AdminMember/> }/>
            <Route path="auth" element={ <AdminAuth/> }/>
            <Route path="product" element={ <AdminProduct/> }/>
            <Route path="inquery" element={ <AdminInquery/> }/>
            <Route path="statistics" element={ <AdminStatistics/> }/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
