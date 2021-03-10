import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PlayerStatus from '../components/playerStatus/playerStatus';
import { getLS } from '../helpers';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMsg: '',
      pt: 0,
      rightQuest: 0,
      rendRedirect: false,
      nextScreen: '',
    };
    this.setingState = this.setingState.bind(this);
  }

  componentDidMount() {
    this.setingState();
    this.comparaAcertos();
  }

  setingState() {
    const player = getLS('state').player;
    this.setState({ pt: player.score, rightQuest: player.assertions });
  }

  comparaAcertos() {
    const rightQuest = getLS('state').player.assertions;
    if (rightQuest < 3) {
      this.setState({ feedbackMsg: 'Podia ser melhor...' });
    } else if (rightQuest >= 3) {
      this.setState({ feedbackMsg: 'Mandou bem!' });
    }
  }

  handleClick(tela) {
    this.setState({ rendRedirect: true, nextScreen: tela });
  }

  render() {
    const { pt, rightQuest, rendRedirect } = this.state;
    if (rendRedirect) {
      return <Redirect Push to={this.state.nextScreen} />;
    }
    return (
      <div>
        <PlayerStatus
          player={getLS('state').player}
          score={pt}
          showSettings={'true'}
        />
        <div data-testid="feedback-text" className="feedback-text">
          {this.state.feedbackMsg}
        </div>
        <div className="feedback-score">
          <div >
            Você acertou <span data-testid="feedback-total-question">{rightQuest}</span> questões!
          </div>
          <div>
            Um total de <span data-testid="feedback-total-score">{pt}</span> pontos
          </div>
        </div>
        <button data-testid="btn-ranking" onClick={() => this.handleClick('/ranking')}>
          VER RANKING
        </button><br />
        <button data-testid="btn-play-again" onClick={() => this.handleClick('/')}>
          JOGAR NOVAMENTE
        </button>
      </div>
    );
  }
}

export default Feedback;
