import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import './Login.css';

function Login() {

    // const [id, setId] = useState("");
    // const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState('');

    useEffect(() => {
        console.log("useEffect Login", isLogin);
        setIsLogin(window.sessionStorage.getItem('isLogin'));       
        if(isLogin) {
            navigate('/main');
        }
    },
    [isLogin]);

    const navigate = useNavigate();
    const defaultValues = {
        memberId : '',
        password : ''
    };

    const toast = useRef(null);
    const showError = (msg) => {
        toast.current.show({severity:'error', summary: 'Error Message', detail:msg, life: 3000});
    }

    const clear = () => {
        toast.current.clear();
    }


    const { control, formState: { errors }, handleSubmit } = useForm({ defaultValues });

    const onSubmitHandler = (data) => {
        
        fetch("http://localhost:8888/api/account/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {

            console.log(json);
            if(json.status == 200){
                window.sessionStorage.setItem('isLogin', true);
                setIsLogin(true);

                window.localStorage.setItem('access_token', json.accessToken);
                window.localStorage.getItem('access_token') !== 'undefined' 
                ? navigate('/project') 
                : showError('로그인에 실패하였습니다.');
            } else {
                showError('로그인에 실패하였습니다.');
            }            

            // ? ((data.memberId === 'admin')? navigate('/admin') : navigate('/main'))
            // : console.log('login Failed');         

        })
        .catch((err) => {
          console.log('login error: ' + err);
          showError('로그인에 실패하였습니다.');
        });
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div className="flex justify-content-center login-center">
            <Toast ref={toast} position="top-center" />

            <div className='formDiv'>
                <div className='card'>
                    <h5 className="text-center">로그인</h5>
                    <form 
                        style={{display: 'flex', flexDirection: 'column' }}
                        onSubmit={handleSubmit(onSubmitHandler)}
                        className="p-fluid"
                    >
                        <div className="field">
                            <span className="p-float-label">
                                <Controller 
                                    name="memberId" 
                                    control={control} 
                                    rules={{ required: '아이디는 필수값입니다.' }} 
                                    render={({ field, fieldState }) => (
                                        <InputText 
                                            id={field.name} 
                                            {...field}
                                            autoComplete="off" 
                                            autoFocus 
                                            className={classNames({ 'p-invalid': fieldState.invalid })} 
                                        />
                                )} />
                                <label htmlFor="memberId" className={classNames({ 'p-error': errors.memberId })}>ID*</label>
                            </span>
                            {getFormErrorMessage('memberId')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller 
                                    name="password" 
                                    control={control} 
                                    rules={{ required: '비밀번호는 필수값입니다.' }} 
                                    render={({ field, fieldState }) => (
                                        <Password 
                                            id={field.name} 
                                            {...field} 
                                            toggleMask 
                                            autoComplete="off"
                                            className={classNames({ 'p-invalid': fieldState.invalid })} 
                                        />
                                )} />
                                <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>

                        <Button 
                            type="submit"
                            label="로그인"  
                            className="p-button-success p-button-sm"  
                        />
                    </form>

                    <NavLink to="/signup">회원가입</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Login;