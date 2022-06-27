import MainHeaderCSS from './MainHeader.module.css';
import { Button } from 'primereact/button';
import { useSelector } from 'redux';

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
                <label className={ MainHeaderCSS.leftDateCount }>20일 남음</label> 
                <span>무료체험 프로모션 사용 중</span>
                <Button id={ MainHeaderCSS.payBtn} label="결제하기" className="p-button-outlined p-button-info" />
            </div>
            <div>
                <div id={ MainHeaderCSS.welcome }>
                    <span>akswlswnfafs님 환영합니다</span>
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