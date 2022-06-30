import MainHeaderCSS from "./MainHeader.module.css";
import { Button } from "primereact/button";
import { useSelector } from "redux";
import { useNavigate } from "react-router-dom";
import { OverlayPanel } from 'primereact/overlaypanel';
import React, { useState, useEffect, useRef } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';


function MainHeader() {
  const navigate = useNavigate();
  const onClickHandler = () => navigate("/main");

  const op = useRef(null);

  const decoded = decodeJwt(window.localStorage.getItem("access_token"));
  const [isLogin, setIsLogin] = useState(window.sessionStorage.getItem('isLogin'));

  const onClickProfile = () => {
    navigate("/project/profile");
  }

  const onClickLogout = () => {
    console.log('logout process finished');
    sessionStorage.clear();
    setIsLogin(false);
  }

  useEffect(() => {    
    if(!isLogin){
      console.log(isLogin);
      navigate("/");
    }
  },
  [isLogin]);

  return (
    <header id={ MainHeaderCSS.header }>
      <div>
        <div id={MainHeaderCSS.logo}>
          <img
            src={process.env.PUBLIC_URL + "/logo_main.png"}
            alt="logo_main"
            width="160"
            onClick={onClickHandler}
          />
        </div>
      </div>
      <div>

        <label className={MainHeaderCSS.leftDateCount}>20일 남음</label>
        <span>무료체험 프로모션 사용 중</span>
        <Button
          id={MainHeaderCSS.payBtn}
          label="결제하기"
          className="p-button-outlined p-button-info"
        />
      </div>
      <div>
        <div id={MainHeaderCSS.welcome}>
          <span>{ decoded.id }님 환영합니다</span>
        </div>        
      </div>

      <div className="profile-container" style={ { width:"5%", marginRight:"auto"}}>
          <Button 
            type="button" 
            icon="pi pi-user" 
            onClick={(e) => op.current.toggle(e)} 
            aria-haspopup 
            aria-controls="overlay_panel" 
            className="p-button-raised p-button-rounded" 
          />
          <OverlayPanel ref={op} id="overlay_panel" style={{width: '150px'}} className="overlaypanel">              
              <Button label="Profile" className="p-button-text p-button-plain" icon="pi pi-user" onClick={ onClickProfile }/>               
              <Button label="Logout" className="p-button-text p-button-plain" icon="pi pi-power-off" onClick={ onClickLogout }/>             
          </OverlayPanel>          
      </div>
      
    </header>
  );
}

export default MainHeader;

