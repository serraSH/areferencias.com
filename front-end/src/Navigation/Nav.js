import { useNavigate } from 'react-router-dom';
import '../App.css';

function Nav({user}){
    console.log(user);
    const navigate = useNavigate();
    const signOut = async () => {
       await localStorage.clear().then(() => {navigate('/')});
    }

    return(
      <div className="row">
      <nav className='nav_styles'>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo"><b className='logo_ar'>AR</b>eferencias.com</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/profile">{user.User}</a></li>
            <li onClick={signOut}><a href="/">Salir</a></li>
          </ul>
        </div>
      </nav>
      </div>
        
    )
}

export default Nav;