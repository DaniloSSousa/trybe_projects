import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import API from '../services/api';

const UserRegister = () => {
  const history = useHistory();

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [checkbox, setCheckbox] = useState('');

  const [errMsg, setErrMsg] = useState('');

  const isNameValid = (checkName) => checkName.match(/^([a-zA-Zà-úÀ-Ú]|\s+)+$/);

  const twelve = 12;

  const six = 6;

  const nameValidated = () => {
    if (!name || !isNameValid(name) || name.length < twelve) return false;
    return true;
  };

  const isEmailValid = (checkMail) => checkMail.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/i);

  const emailValidated = () => {
    if (!email || !isEmailValid(email) || email.length < six) return false;
    return true;
  };

  const disableButton = !nameValidated() || !password || password.length < six || !emailValidated();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const role = checkbox === 'on' ? 'administrator' : 'client';

    const apiResult = await API.registerApi(name, email, password, role);

    if (apiResult.data.err) return setErrMsg(apiResult.data.err);

    setErrMsg('');

    if (checkbox === 'on') {
      localStorage.setItem('user', JSON.stringify('newUser'));
      return history.push('/admin/orders');
    }

    if (checkbox !== 'on') {
      localStorage.setItem('user', JSON.stringify('newUser'));
      return history.push('/products');
    }
    return true;
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <section className="card w-75 mx-auto m-3">
          <div className="form-group w-75 mx-auto m-2">
            <label htmlFor="name">
              Nome
              <input
                data-testid="signup-name"
                id="name"
                name="name"
                type="text"
                onChange={ (e) => setName(e.target.value) }
                minLength="12"
                className="form-control"
              />
            </label>

          </div>

          <div className="form-group w-75 mx-auto m-2">
            <label htmlFor="email">
              Email
              <input
                data-testid="signup-email"
                id="email"
                name="email"
                type="email"
                onChange={ (e) => setEmail(e.target.value) }
                className="form-control"
              />
            </label>

          </div>

          <span className="mx-auto m-3 text-danger">{errMsg}</span>

          <div className="form-group w-75 mx-auto m-2">
            <label htmlFor="password">
              Password
              <input
                data-testid="signup-password"
                id="password"
                name="password"
                type="password"
                onChange={ (e) => setPassword(e.target.value) }
                minLength="6"
                className="form-control"
              />
            </label>

          </div>

          <div className="form-group w-75 mx-auto m-2">

            <label htmlFor="sell" className="m-2">
              Quero Vender
              {' '}
              <input
                data-testid="signup-seller"
                id="sell"
                name="sell"
                type="checkbox"
                onChange={ (e) => setCheckbox(e.target.value) }
              />
            </label>
          </div>

          <button
            data-testid="signup-btn"
            type="submit"
            disabled={ disableButton }
            className="btn btn-warning w-50 mx-auto m-2"
          >
            Cadastrar
          </button>
        </section>
      </form>
    </div>
  );
};

export default UserRegister;
