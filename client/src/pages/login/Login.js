import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';



function Login() {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log('id', id);
        console.log('Password', password);    

        const loginInfo = {
            id: id,
            password: password
        }

        fetch("http://localhost:8888/api/account/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              memberId: loginInfo.id,
              password: loginInfo.password
            })
        })
        .then(response => response.json())
        .then(json => {
            window.localStorage.setItem('access_token', json.accessToken);

            window.localStorage.getItem('access_token') !== 'undefined' 
            ? navigate('/main') : console.log('login Failed');
                
            
        })
        .catch((err) => {
          console.log('login error: ' + err);
        });
    };



    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
            width: '100%', height: '50vh'
        }}>
            <form 
                style={{display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>ID</label>
                <input type="id" value={ id } onChange={ onIdHandler } />
                <label>Password</label>
                <input type="password" value={ password } onChange={ onPasswordHandler } />
                <br />
                <button>
                    Login
                </button>
            </form>

            <NavLink to="/signup">회원가입</NavLink>
        </div>
    );
}

export default Login;