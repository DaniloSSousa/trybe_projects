import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { asyncActionTokenData, actionPlayerAdd } from '../actions';
import logo from '../trivia.png';
import { getElt, getLS, setLS } from '../helpers';

// Componente Login q renderiza os elementos da página inicial.

class Login extends Component {
  constructor(props) {
    super(props);
    this.storeDataUser = this.storeDataUser.bind(this);
    this.state = {
      email: '',
      name: '',
      loggedin: false,
    };
  }

  // Função que armazena o estado de logado e o token obtido via API no local storage.
  // Também armazena o token na store.

  storeDataUser() {
    const { email, name } = this.state;
    const { tokenData, playerAdd } = this.props;
    setLS('state', {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    });
    const oPlayer = {
      email,
      name,
    };
    playerAdd(oPlayer);
    setLS('loggedin', true);
    this.setState({ loggedin: getLS('loggedin') });
    return tokenData('https://opentdb.com/api_token.php?command=request');
  }

  // Função que verifica se os inputs estão preenchidos.

  checkInputFill(e) {
    if (e.target.id === 'input-email') this.setState({ email: e.target.value });
    if (e.target.id === 'input-name') this.setState({ name: e.target.value });
    const btn = getElt('#btn-play');
    if (getElt('#input-email').value && getElt('#input-name').value) {
      btn.disabled = false;
      btn.addEventListener('click', this.storeDataUser);
      return true;
    }
    btn.disabled = true;
    return true;
  }

  render() {
    const { email, name, loggedin } = this.state;
    return (loggedin ? <Redirect push to="/game" /> : <div>
      <Link to="/settings"><button data-testid="btn-settings">Configurações</button></Link><br />
      <img src={logo} className="App-logo" alt="logo" /><br />
      <label htmlFor="input-email">Email do Gravatar: </label>
      <input
        type="text" id="input-email" data-testid="input-gravatar-email" value={email}
        onChange={(e) => this.checkInputFill(e)}
      /><br />
      <label htmlFor="input-name">Nome do Jogador: </label>
      <input
        type="text" id="input-name" data-testid="input-player-name" value={name}
        onChange={(e) => this.checkInputFill(e)}
      /><br />
      <button
        id="btn-play" data-testid="btn-play" disabled
      >
        JOGAR!
      </button>
    </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenData: (url) => dispatch(asyncActionTokenData(url)),
  playerAdd: (oPlayer) => dispatch(actionPlayerAdd(oPlayer)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  playerAdd: PropTypes.func.isRequired,
  tokenData: PropTypes.func.isRequired,
};
