import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';

const ShareBtn = ({ type, id, index }) => {
  const [shareTimer, setShareTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    if (shareTimer === 5) {
      clearInterval(timerInterval);
    }
  }, [shareTimer, timerInterval]);

  const handleShare = () => {
    clearInterval(timerInterval);
    setShareTimer(1);
    setTimerInterval(
      setInterval(() => setShareTimer((prevState) => prevState + 1), 1000),
    );
    copy(`http://${window.location.host}/${type}s/${id}`);
  };

  return (
    <React.Fragment>
      <input
        type="image"
        src={shareIcon}
        alt="Share button"
        data-testid={`${index}-horizontal-share-btn`}
        onClick={handleShare}
      />
      {shareTimer > 0 && shareTimer < 5 ? (
        <div>
          <p>Link copiado!</p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

ShareBtn.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default ShareBtn;
