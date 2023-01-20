import { useNavigate } from 'react-router-dom';
import '../App.css';

function NavMain({goTo}){

    const navigate = useNavigate();

    return(
      <div className="row">
        <div className='col s12'>
        <nav className='nav_styles'>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo"><b className='logo_ar'>AR</b>eferencias.com</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li ><a href="/">Inicio</a></li>
            <li ><a href="/">{goTo}</a></li>
          </ul>
        </div>
        </nav>
        </div>
      </div>
        
    )
}

export default NavMain;