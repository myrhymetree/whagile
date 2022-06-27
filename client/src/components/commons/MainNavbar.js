import MainNavbarCSS from './MainNavbar.module.css';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom'; /* 페이지 강제 이동 */
import { NavLink } from 'react-router-dom';
import Icon from '@mdi/react'
import { mdiMonitorDashboard  } from '@mdi/js';
import { Button } from 'primereact/button';
import { mdiChartGantt } from '@mdi/js';

function MainNavbar() {

    const navigate = useNavigate();

    let items = [
        {label: '대시보드', icon: 'pi pi-fw pi-chart-pie', command:()=>{ navigate(`/dashboard`); }},
        {label: '백로그 및 스프린트', icon: 'pi pi-fw pi-inbox', command:()=>{ navigate(`/backlogs`); }},
        {label: '간트차트', icon: 'pi pi-fw pi-chart-bar', command:()=>{ navigate(`/gantt`); }},
        {label: '칸반보드', icon: 'pi pi-fw pi-th-large', command:()=>{ navigate(`/kanban`); }},
        {label: '히스토리', icon: 'pi pi-fw pi-history', command:()=>{ navigate(`/history`); }},
        {label: '프로젝트 관리', icon: 'pi pi-fw pi-cog', command:()=>{ navigate(`/management`); }},
    ];

    return (
        <nav>
            <div className={ MainNavbarCSS.projectName }>
                <Icon path={ mdiMonitorDashboard } 
                    title="User Profile"
                    size={0.8}
                    color="#9B9EA3"
                />
                <span style={ { marginLeft: '8px' } }>프로젝트 명</span>
            </div>
            <div>
                <Menu model={items} />
            </div>
            <div>
                <Button 
                    id={ MainNavbarCSS.projectListBtn } 
                    label="프로젝트 목록" 
                    className="p-button-raised" 
                    onClick={ () => navigate('/projects') }
                />        
            </div>
        </nav>
    );
}

export default MainNavbar;