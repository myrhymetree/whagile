// import "./assets/themes/soho/soho-dark/theme.css";  //theme
import "./assets/themes/soho/soho-dark/theme.scss"; //theme
// require('./assets/themes/soho/soho-dark/theme.scss');  //theme
import "primereact/resources/primereact.min.css";   //core css
import "primeicons/primeicons.css";                 //icons
import "./App.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import ProjectLayout from './layouts/ProjectLayout';
import Main from './pages/main/Main';
import Profile from "./pages/profile/Profile";
import Dashboard from './pages/project/dashboard/Dashboard';
import BacklogAndSprint from './pages/project/backlog-and-sprint/BacklogAndSprint';
import KanbanBoard from "./pages/project/kanban/KanbanBoard";
import List  from './pages/projects/List';
import Regist  from './pages/projects/Regist';
import History from './pages/project/history/History';
import Management from './pages/project/management/Management';

// admin
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
import AdminMember from './pages/admin/member/AdminMember';
import AdminAuth from './pages/admin/auth/AdminAuth';
import AdminProduct from './pages/admin/product/AdminProduct';
import AdminInquery from './pages/admin/inquery/AdminInquery';
import AdminStatistics from './pages/admin/statistics/AdminStatistics';

function App() {

  const isLogin = window.sessionStorage.getItem('isLogin');

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" 
            element={ 
              (!isLogin)
              ? <Login/>
              : <Navigate replace to ="/main" />
            } />
          {/* { isLogin ? <Navigate replace to ="/main" /> : <Login/>} */}
          <Route path="/main" element={ <Main/> } />
          <Route path="/signup" element={ <Signup/> } />
          <Route path="/project/:projectCode" element={ <ProjectLayout/>} >
            <Route path="dashboard" element={ <Dashboard/> }/>
            <Route path="backlog-and-sprint" element={ <BacklogAndSprint/> }/>
            {/* <Route path=":projectId/sprint" element={ <Sprint/> }/> */}
            <Route path="kanban-board" element={ <KanbanBoard/> }/>
            <Route path="history" element={ <History/> }/>
            <Route path="management" element={ <Management/> }/>
            <Route path="profile" element={ <Profile/> } />
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

          <Route path="/projects" element={ <List/> }/>
          <Route path="/projects/regist" element={ <Regist/> }/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;