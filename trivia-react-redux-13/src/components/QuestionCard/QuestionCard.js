import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './QuestionCard.css';

class QuestionCard extends Component {
  render() {
    const { category, quesText } = this.props;

    return (
      <div className="quest_container">
        <div data-testid="question-category">{category}</div>
        <div data-testid="question-text">{quesText}</div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  category: PropTypes.string.isRequired,
  quesText: PropTypes.string.isRequired,
};

export default QuestionCard;
