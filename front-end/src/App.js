import logo from './logo.svg';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const goToLogin = async () => {
    navigate('/signin');
  }

  const signUp = async () => {
    navigate('/signup');
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={'http://localhost/diargento/front-end/public/main_img.png'} className="App-logo" alt="" />
        <p>
        <b className='logo_ar'>AR</b>eferencias.com
        </p>
        <div className="row">
            <div className="row">
              <div className="input-field col s12">
               <a onClick={goToLogin} className="style_ingresar">Ingresar</a>
              </div>
              <div className="input-field col s12">
              <button onClick={signUp} className="btn waves-effect blue" type="submit" name="action">Crear usuario
               <i className="material-icons right">account_circle</i>
              </button>
              </div>
              <div className="input-field col s12">
              </div>
            </div>
        </div>
      </header>
    </div>
  );
}

export default App;
