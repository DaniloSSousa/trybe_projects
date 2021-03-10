import React from 'react';
import PropTypes from 'prop-types';
import '../../css/Recommendations.css';

const Recommendations = ({ sixRecs, rec }) => {
  const idRec = `id${rec}`;
  const strRecThumb = `str${rec}Thumb`;
  const strRec = `str${rec}`;
  return (
    <div>
      <h1>Recomendadas</h1>
      <div className="carousel">
        <div className="content">
          {sixRecs.map((oRec, index) =>
            <div className="rec" key={oRec[idRec]} data-testid={`${index}-recomendation-card`}>
              <img src={oRec[strRecThumb]} alt="Recomendações" />
              <p>{oRec.strCategory}</p>
              <p data-testid={`${index}-recomendation-title`} className="title">{oRec[strRec]}</p>
            </div>,
          )}
        </div>
      </div>
    </div>
  );
};

Recommendations.propTypes = {
  sixRecs: PropTypes.arrayOf(PropTypes.object).isRequired,
  rec: PropTypes.string.isRequired,
};

export default Recommendations;
