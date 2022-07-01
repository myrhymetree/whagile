import { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import ProfileCSS from './Profile.module.css';

function Profile() {

    const [userID, setUserID] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [purpose, setPurpose] = useState('');

    const header = (        
        <img            
            alt="Card" 
            src={`${process.env.PUBLIC_URL}/logo_user.png`}                
        />
    );
    const footer = (
        <div>
            <div className={ ProfileCSS.cardFooter }>
                <Button style={{ width: '40%' }} className="p-button-warning p-button-text" label="비밀번호변경" />
                <Button style={{ width: '40%' }} className="p-button-warning p-button-text" label="이메일변경" />
            </div>
            <div className={ ProfileCSS.cardFooter }>
                <Button style={{ width: '90%' }} label="저장하기" />
            </div>
        </div>
    );

    

    return (
        <div className={ ProfileCSS.profileContainer }>
            <Card style={{ width: '30em' }} footer={footer} header={header}>
               
                <span className="p-float-label p-inputtext-sm memberInfo" style={{ margin: '1.4em' }}>
                    <InputText id="userID" style={{ width: '100%' }} value={userID} onChange={(e) => setUserID(e.target.value)} />
                    <label htmlFor="userID">ID</label>
                </span>

                <span className="p-float-label p-inputtext-sm memberInfo" style={{ margin: '1.4em' }}>
                    <InputText id="username" style={{ width: '100%' }} value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="username">username</label>
                </span>

                <span className="p-float-label p-inputtext-sm memberInfo" style={{ margin: '1.4em' }}>
                    <InputText id="phone" style={{ width: '100%' }} value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <label htmlFor="phone">phone</label>
                </span>

                <span className="p-float-label p-inputtext-sm memberInfo" style={{ margin: '1.4em' }}>
                    <InputText id="company" style={{ width: '100%' }} value={company} onChange={(e) => setCompany(e.target.value)} />
                    <label htmlFor="company">company</label>
                </span>

                <span className="p-float-label p-inputtext-sm memberInfo" style={{ margin: '1.4em' }}>
                    <InputText id="purpose" style={{ width: '100%' }} value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                    <label htmlFor="purpose">purpose</label>
                </span>

            </Card>
        </div>
    );
}

export default Profile;
