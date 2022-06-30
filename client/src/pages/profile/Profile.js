import { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

function Profile() {

    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [purpose, setPurpose] = useState('');

    const header = (
        <img 
            alt="Card" 
            src={`${process.env.PUBLIC_URL}/logo_user.png`}
            onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} 
            style={{ width: '80%'}}
        />
    );
    const footer = (
        <span>
            <Button style={{ width: '80%', alignItems: 'center' }} label="저장하기" />
        </span>
    );

    return (
        <div className="profile-container">
            <Card title="회원 정보" style={{ width: '30em',  }} footer={footer} header={header}>
               
                <span className="p-float-label p-inputtext-sm memberInfo" style={{ margin: '1em' }}>
                    <InputText id="userID" style={{ width: '100%' }} value={userID} onChange={(e) => setUserID(e.target.value)} />
                    <label htmlFor="userID">ID</label>
                </span>

                <span className="p-float-label p-inputtext-sm memberInfo" style={{ margin: '1em' }} >
                    <InputText id="email" style={{ width: '100%' }} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="email">email</label>                    
                </span>

                <span className="p-float-label p-inputtext-sm memberInfo" style={{ margin: '1em' }}>
                    <InputText id="username" style={{ width: '100%' }} value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="username">username</label>
                </span>

                <span className="p-float-label p-inputtext-sm memberInfo" style={{ margin: '1em' }}>
                    <InputText id="phone" style={{ width: '100%' }} value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <label htmlFor="phone">phone</label>
                </span>

                <span className="p-float-label p-inputtext-sm memberInfo" style={{ margin: '1em' }}>
                    <InputText id="company" style={{ width: '100%' }} value={company} onChange={(e) => setCompany(e.target.value)} />
                    <label htmlFor="company">company</label>
                </span>

                <span className="p-float-label p-inputtext-sm memberInfo" style={{ margin: '1em' }}>
                    <InputText id="purpose" style={{ width: '100%' }} value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                    <label htmlFor="purpose">purpose</label>
                </span>

            </Card>
        </div>
    );
}

export default Profile;
