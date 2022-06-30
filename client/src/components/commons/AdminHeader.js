import AdminHeaderCss from './AdminHeader.module.css';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function AdminHeader() {

    const navigate = useNavigate();

    const onClickHandler = () => navigate(`/admin`)

    return (
        <header id={AdminHeaderCss.admin}>
            {/* logo */}
            <div id={AdminHeaderCss.logo}>
                <img 
                    src={process.env.PUBLIC_URL + '/logo_admin.png'} 
                    alt="logo_admin"
                    width="160"
                    onClick={ onClickHandler }
                />
            </div>
            
            {/* welcome */}
            <div id={AdminHeaderCss.welcome}>
                <span>Admin님 환영합니다</span>
                <div>
                    <Button 
                        icon="pi pi-user" 
                        className="p-button-rounded p-button-outlined" 
                        aria-label="User"
                    />
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;