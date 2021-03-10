import React, { useState } from 'react';
import SearchInput from './SearchInput';
import SearchBtn from './SearchBtn';
import SearchRadio from './SearchRadio';
import '../../css/SearchBar.css';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  return (
    <form className="search">
      <SearchInput searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className="radio-btns">
        <SearchRadio
          id="ingredient"
          value="i"
          searchRadio={searchRadio}
          setSearchRadio={setSearchRadio}
          label="Ingrediente"
        />
        <SearchRadio
          id="name"
          value="s"
          searchRadio={searchRadio}
          setSearchRadio={setSearchRadio}
          label="Nome"
        />
        <SearchRadio
          id="first-letter"
          value="f"
          searchRadio={searchRadio}
          setSearchRadio={setSearchRadio}
          label="Primeira letra"
        />
      </div>
      <SearchBtn searchInput={searchInput} searchRadio={searchRadio} />
    </form>
  );
};

export default SearchBar;
