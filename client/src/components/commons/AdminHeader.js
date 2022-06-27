import AdminHeaderCss from './AdminHeader.module.css';
import { Button } from 'primereact/button';

function AdminHeader() {

    return (
        <header>
            <div>
                <div id={ AdminHeaderCss.logo }>
                    <img 
                        src={process.env.PUBLIC_URL + '/logo_admin.png'} 
                        alt="logo_admin"
                        width="160"
                    />
                </div>
            </div>
            <div>
                <div id={ AdminHeaderCss.welcome }>
                    <span>Admin님 환영합니다</span>
                    <div>
                        <Button 
                            icon="pi pi-user" 
                            className="p-button-rounded p-button-outlined" 
                            aria-label="User"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;