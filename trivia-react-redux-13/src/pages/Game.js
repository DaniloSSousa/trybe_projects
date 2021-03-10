import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { actionTokenAdd, actionDataAdd } from '../actions';
import { getLS, setLS, getSS } from '../helpers';
import './pages_css/Game.css';
import QuestionCard from '../components/QuestionCard/QuestionCard';
import PlayerStatus from '../components/playerStatus/playerStatus';
import AnswerCard from '../components/AnswerCard/AnswerCard';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ctrQuest: 0,
      sum: 0,
      ready2Sum: true,
      nextButton: false,
      nextScreen: false,
    };
    this.sumPoints = this.sumPoints.bind(this);
    this.showNextButton2 = this.showNextButton2.bind(this);
    this.renderPoints = this.renderPoints.bind(this);
  }

  componentDidMount() {
    const { addToken, addData } = this.props;
    const state = getLS('state');
    if (getLS('data') !== null) {
      addToken(getLS('token'));
      addData(getLS('data'));
    }
    setLS('state',
      { ...state, player: { ...state.player, score: 0 } },
    );
  }

  sumPoints(isCorrect) { //  10 + ( timer * dificuldade )
    const { questions } = this.props;
    const { ctrQuest } = this.state;
    const state = getLS('state');
    const difficulty = questions[ctrQuest].difficulty;
    let diffQuestion;
    if (difficulty === 'easy') diffQuestion = 1;
    if (difficulty === 'medium') diffQuestion = 2;
    if (difficulty === 'hard') diffQuestion = 3;
    const time = getSS('timer');
    let auxSum = 0;
    if (isCorrect) {
      auxSum = 10 + (time * diffQuestion);
      setLS('state',
        {
          ...state,
          player: {
            ...state.player,
            assertions: state.player.assertions + 1,
            score: state.player.score + auxSum,
          },
        },
      );
      this.setState((prevState) => ({ sum: prevState.sum + auxSum }));
    }
    this.setState({ ready2Sum: false });
  }

  showNextButton2(value, isCorrect) {
    const { ready2Sum } = this.state;

    if (ready2Sum) setTimeout(this.sumPoints(isCorrect), 200);
    return this.setState({ nextButton: value });
  }

  passQuest(limit) {
    const { ctrQuest } = this.state;
    if ((ctrQuest + 1) <= limit) {
      this.setState({
        ctrQuest: ctrQuest + 1,
        ready2Sum: true,
        nextButton: false,
      });
    } else {
      this.setState({ nextScreen: true });
    }
  }

  renderPoints() {
    const { nextButton, nextScreen } = this.state;
    if (nextButton && !nextScreen) {
      return (
        <button data-testid="btn-next" onClick={() => this.passQuest(4)}>
          Próxima
        </button>
      );
    } else if (nextScreen && nextButton) {
      return (
        <div>
          <button data-testid="btn-next">
            Próxima
          </button>
          <Redirect Redirect push to="/feedback" />
        </div>
      );
    }
    return (
      <div />
    );
  }

  render() {
    const { ctrQuest, sum } = this.state;
    const { loading, questions } = this.props;
    return (loading || (questions[0] === undefined) ? <h1>Game loading...</h1> : <div>
      <h1>Game</h1>
      <PlayerStatus player={getLS('state').player} score={sum} showSettings={'false'} />
      <QuestionCard
        category={questions[ctrQuest].category}
        quesText={questions[ctrQuest].question}
      />
      <AnswerCard
        answer={questions[ctrQuest]} showNextButton2={this.showNextButton2}
        ctrQuest={ctrQuest}
      />
      {this.renderPoints()}
    </div>);
  }
}

Game.propTypes = {
  addData: PropTypes.func.isRequired,
  addToken: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.data.loading,
  questions: state.data.data,
});

const mapDispatchToProps = (dispatch) => ({
  addToken: (token) => dispatch(actionTokenAdd(token)),
  addData: (data) => dispatch(actionDataAdd(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
