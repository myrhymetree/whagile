import { NavLink } from 'react-router-dom';

function MainNavbar() {

    return (
        <div>
            <ul>
                <li><NavLink to="/">메인으로</NavLink></li>           
            </ul>
        </div>
    );
}

export default MainNavbar;