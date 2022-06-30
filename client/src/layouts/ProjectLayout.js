import { Outlet } from 'react-router-dom';
import MainHeader from '../components/commons/MainHeader';
import MainNavbar from '../components/commons/MainNavbar';
import ProjectLayoutCSS from './ProjectLayout.module.css';

function ProjectLayout() {

    return (
        <div>
            <MainHeader/>
            <div className={ ProjectLayoutCSS.layout }>
                <MainNavbar/>
                <main className={ ProjectLayoutCSS.main }>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}

export default ProjectLayout;