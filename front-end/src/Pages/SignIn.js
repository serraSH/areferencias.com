import { useState } from "react";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import Profile from './Profile';
import NavMain from '../Navigation/NavMain';

function SignIn() {

    const navigate = useNavigate();

    const [token, setToken] = useToken();

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const login = () => {
        axios({
            method:'POST',
            url:'http://localhost:8080/api/login',
            data:{
                email: email,
                password: pw
            }
        }).then(res => newToken(res.data.token).then(console.log(token)))
          .catch(err => alert("Datos incorrectos"));

        const newToken = async n_token => {
            //await setToken(n_token);
            await localStorage.setItem('token', n_token);
            await navigate('/profile');
        }
    }

    return(
      <div className="App">
        <header className="App-header">
        <a href="/" className="brand-logo"><b className='logo_ar'>AR</b>eferencias.com</a>
          <div className="row">
              <div className="row">
                <div className="input-field col s12">
                 Ingresar
                </div>
                <div className="input-field col s12">
                 <input className="blue-text text-darken-2" onChange={e => setEmail(e.target.value)} type="email" placeholder="Correo electronico"/>
                </div>
                <div className="input-field col s12">
                 <input className="blue-text text-darken-2" onChange={e => setPw(e.target.value)} type="password" placeholder="Clave"/>
                </div>
                <div className="input-field col s12">
                <button onClick={login} className="btn waves-effect blue" type="submit" name="action" disabled={!email || !pw}>Ingresar
                 <i className="material-icons right">send</i>
                </button>
                </div>
              </div>
          </div>
        </header>
      </div>
    )
}

export default SignIn;