import { Outlet } from 'react-router-dom';
import MainHeader from '../components/commons/MainHeader';
import MainNavbar from '../components/commons/MainNavbar';

function MainLayout() {

    return (
        <div>
            <MainHeader/>
            <MainNavbar/>
            <Outlet/>
        </div>
    );
}

export default MainLayout;