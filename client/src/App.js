import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import MainLayout from './layouts/MainLayout';
import Main from './pages/main/Main';
import "./assets/themes/soho/soho-dark/theme.css";  //theme
import "primereact/resources/primereact.min.css";   //core css
import "primeicons/primeicons.css";                 //icons
import "./App.css";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Login/>} />
          <Route path="/signup" element={ <Signup/> } />
          <Route path="/main" element={ <MainLayout/>} >
            <Route index element={ <Main/> } />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
