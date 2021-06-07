import React, { useState } from 'react';
import { TOKEN_KEY } from '../../../services/shared/api';
import UserDataService from '../../../services/UserService/index';


const Login = props => {
    const [ user, setUser ] = useState({id: null, login: '', password: ''}) ;

    const handleInputChange = e => {
        const { name, value } = e.target;
        setUser({...user, [name]: value});
    }

    const sendLogin = () => {
        var data ={
            login: user.login,
            password: user.password
        };

        UserDataService.login(data)
            .then(response => {
                localStorage.setItem(TOKEN_KEY, response.data?.result?.token);
                console.log(TOKEN_KEY+": "+localStorage.getItem(TOKEN_KEY));
                props.history.push("/category");
            })
            .catch(e => {
                console.log(e);
            })
    }

  return (
      <div>
          <div className="form-group">
            <label htmlFor="name">Login</label>
            <input 
                className="form-control"
                id="login"
                required
                value={user.login}
                onChange={handleInputChange}
                name="login"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Password</label>
            <input 
                type="password"
                className="form-control"
                id="password"
                required
                value={user.password}
                onChange={handleInputChange}
                name="login"
            />
          </div>
          <button onclick={sendLogin} className="btn btn-success">
            Submit
          </button>
      </div>
  );
}

export default Login;