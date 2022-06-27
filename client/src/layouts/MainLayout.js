import { Outlet } from 'react-router-dom';
import MainHeader from '../components/commons/MainHeader';
import MainNavbar from '../components/commons/MainNavbar';
import MainLayoutCSS from './MainLayout.module.css';

function MainLayout() {

    return (
        <div>
            <MainHeader/>
            <div className={ MainLayoutCSS.layout }>
                <MainNavbar/>
                <Outlet/>
            </div>
        </div>
    );
}

export default MainLayout;