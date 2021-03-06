import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Header from './Header';

import API from '../services/api';

const Login = () => {
  const history = useHistory();

  const [errorMsg, setErrorMsg] = useState('');

  const [eMail, setEmail] = useState('');

  const [password, setPassword] = useState('');

  //  VALIDAÇÃO DE EMAIL
  const isEmailValid = (email = '') => email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/i);

  const six = 6;

  const emailValidated = () => {
    if (!eMail || !isEmailValid(eMail) || eMail.length < six) return false;
    return true;
  };

  // VARIÁVEL QUE DEFINE O "ESTADO" DO BOTÃO
  const disableButton = !password || password.length < six || !emailValidated();

  const handleSubmit = () => {
    // e.preventDefault();

    API.loginApi(eMail, password)

      .then((api) => {
        // if (api.data.user.err) return setErrorMsg(api.data.user.err);

        const { name, email, role } = api.data.user;
        const { token } = api.data;

        localStorage.setItem('user', JSON.stringify({
          name, email, role, token,
        }));

        setErrorMsg('');

        // console.log(api);
        if (api.data.user.role === 'client') return history.push('/products');

        return history.push('/admin/orders');
      })
      .catch((error) => setErrorMsg(error.response.data));
  };

  return (
    <div>
      <Header title="TryBeer" />
      <form className="m-3">
        <section className="card w-75 mx-auto m-3">
          <div className="form-group w-75 mx-auto m-2">
            <label htmlFor="email">
              Email
              <input
                onChange={ (e) => setEmail(e.target.value) }
                data-testid="email-input"
                type="text"
                name="email"
                id="email"
                required
                className="form-control"
              />
            </label>

          </div>

          <div className="form-group w-75 mx-auto m-2">
            <label htmlFor="password">
              Password
              <input
                onChange={ (e) => setPassword(e.target.value) }
                data-testid="password-input"
                type="password"
                name="password"
                id="password"
                minLength="6"
                required
                className="form-control"
              />
            </label>

          </div>

          <span className="mx-auto m-3 text-danger">{errorMsg.toUpperCase()}</span>

          <div className="mx-auto m-2">
            <button
              data-testid="signin-btn"
              type="button"
              disabled={ disableButton }
              className="btn btn-warning m-2"
              onClick={ () => handleSubmit() }
            >
              ENTRAR
            </button>

            <Link data-testid="no-account-btn" to="/register" className="m-2">
              Ainda não tenho conta
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Login;
