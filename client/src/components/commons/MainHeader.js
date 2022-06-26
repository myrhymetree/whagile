import MainHeaderCSS from './MainHeader.module.css';
import { Button } from 'primereact/button';

function MainHeader() {

    console.log(window.localStorage.getItem('access_token'));

    return (
        <header>
            <div>
                <div id={ MainHeaderCSS.logo }>
                    <img 
                        src={process.env.PUBLIC_URL + '/logo_main.png'} 
                        alt="logo_main"
                        width="160"
                    />                
                </div>
            </div>
            <div>
                요금제사용중
            </div>
            <div>
                <div id={ MainHeaderCSS.welcome }>
                    <span>{ }님 환영합니다</span>
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

export default MainHeader;