import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';

function SignUp() {

    const navigate = useNavigate();

    const [token, setToken] = useToken();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const createUser = async () => {
            axios({
            method:'POST',
            url:'http://localhost:8080/api/signup',
            data:{
                email: email,
                password: pw,
                name: name
            }
        }).then(res => newToken(res.data.token))
          .catch(err => alert("El usuario ya existe"));

        const newToken = async n_token => {
            await setToken(n_token);
            navigate('/profile');
        }
    }

    return(
    <div className="App">
      <header className="App-header">
        <div className="row">
        <a href="/" className="brand-logo"><b className='logo_ar'>AR</b>eferencias.com</a>
            <div className="row">
              <div className="input-field col s12">
               Crear usuario
              </div>
              <div className="input-field col s12">
               <input className="blue-text text-darken-2" onChange={e => setName(e.target.value)} type="text" placeholder="Nombre"/>
              </div>
              <div className="input-field col s12">
               <input className="blue-text text-darken-2" onChange={e => setEmail(e.target.value)} type="email" placeholder="Correo electronico"/>
              </div>
              <div className="input-field col s12">
               <input className="blue-text text-darken-2" onChange={e => setPw(e.target.value)} type="password" placeholder="Clave"/>
              </div>
              <div className="input-field col s12">
              <button onClick={createUser} className="btn waves-effect blue" type="submit" name="action" disabled={!name || !email || !pw}>Crear usuario
               <i className="material-icons right">send</i>
              </button>
              </div>
            </div>
        </div>
      </header>
    </div>
    )
}

export default SignUp;