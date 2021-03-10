import React from 'react';
import { Link } from 'react-router-dom';
import RankingList from '../components/RankingList';

const Ranking = () =>
  (
    <div>
      <h1 data-testid="ranking-title">Ranking</h1>
      <RankingList />
      <Link to="/" data-testid="btn-go-home">Voltar ao Início</Link>
    </div>
  );

export default Ranking;
