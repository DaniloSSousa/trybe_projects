import React from 'react';
import { getLS, setLS } from '../helpers';

const insertRanking = () => {
  const { player: { name, score, gravatarEmail } } = getLS('state');

  const rankingOnLS = getLS('ranking');
  let newRanking = [];

  if (rankingOnLS) {
    newRanking = [...rankingOnLS, { name, score, gravatarEmail }];
  } else {
    newRanking = [{ name, score, gravatarEmail }];
  }

  newRanking.sort((a, b) => b.score - a.score);

  setLS('ranking', newRanking);
  return newRanking;
};

class RankingList extends React.Component {

  render() {
    const ranking = insertRanking();
    const defaultImg = 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3';
    return (
      <div>
        <ul>
          {ranking.map((player, index) => (
            <li key={`${player.name}${player.score}`}>
              <img src={defaultImg} alt={`${player.name} Avatar`} />
              <p data-testid={`player-name-${index}`}>{player.name}</p>
              <p>{player.score}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RankingList;
