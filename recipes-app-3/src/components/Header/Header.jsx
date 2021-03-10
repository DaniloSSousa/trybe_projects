import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import '../../css/Header.css';

const renderSearchBtn = (location, toggleSearch, barStatus, getTitle) => {
  const title = getTitle(location);
  if ((title.includes('Explorar') && !title.includes('Origem')) || title.includes('Receitas') || title.includes('Perfil')) {
    return <div className="empty" />;
  }
  return (
    <button type="button" className="ico-search-btn" onClick={() => toggleSearch(!barStatus)}>
      <img data-testid="search-top-btn" src={searchIcon} alt="profile icon" className="ico-search" />
    </button>
  );
};

const getTitle = (location) => {
  let titleArray = location.pathname.split('/');
  titleArray.shift();
  if (titleArray.length === 1) { titleArray = titleArray[0].split('-'); }
  if (titleArray.length === 3) titleArray.splice(1, 1);
  titleArray = titleArray.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  if (titleArray.includes('Area')) {
    titleArray.pop();
    titleArray.splice(1, 1, 'Origem');
  }
  return titleArray.join(' ');
};

const Header = () => {
  const location = useLocation();
  const [barStatus, toggleSearch] = useState(false);

  return (
    <React.Fragment>
      <div className={barStatus ? 'show-bar' : ''}>
        <div className="header">
          <Link to="/perfil">
            <div className="ico_user">
              <img data-testid="profile-top-btn" src={profileIcon} alt="profile icon" />
            </div>
          </Link>
          <p data-testid="page-title">{getTitle(location)}</p>
          {renderSearchBtn(location, toggleSearch, barStatus, getTitle)}
        </div>
        {barStatus ? <SearchBar /> : null}
      </div>
    </React.Fragment>
  );
};

export default Header;
