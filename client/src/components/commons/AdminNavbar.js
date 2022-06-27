import AdminNavbarCss from './AdminNavbar.module.css';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {

    const navigate = useNavigate();

    let items = [
        {label: '대시보드', icon: 'pi pi-fw pi-chart-bar', command:()=>{ navigate(`/admin`); }},
        {label: '회원관리', icon: 'pi pi-fw pi-user', command:()=>{ navigate(`/admin/member`); }},
        {label: '권한관리', icon: 'pi pi-fw pi-key', command:()=>{ navigate(`/admin/auth`); }},
        {label: '상품관리', icon: 'pi pi-fw pi-shopping-bag', command:()=>{ navigate(`/admin/product`); }},
        {label: '고객센터', icon: 'pi pi-fw pi-phone', command:()=>{ navigate(`/admin/inquery`); }},
        {label: '데이터통계', icon: 'pi pi-fw pi-chart-line', command:()=>{ navigate(`/admin/statistics`); }},
    ];

    return (
        <nav>
            <div id={ AdminNavbarCss.title }>
                <i className="pi pi-fw pi-chart-line"/>
                <span>WHY-AGILE 관리자</span>
            </div>
            <Menu model={items} style={{width: '198px'}}/>
        </nav>
    );
}

export default AdminNavbar;