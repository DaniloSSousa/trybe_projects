import React, { useState, useEffect } from 'react';
import { requestAPI } from '../../services/requestAPI';

const CategotyFilter = (url, setFilterCategory, filterCategory) => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const request = async () => {
      const reponse = await requestAPI(url);
      return setCategory(reponse);
    };
    request();
  }, [url]);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // console.log(Object.values(category));
  if (category.length === 0) return <div>Loading...</div>;
  return (
    <div>
      <button
        value="All"
        onClick={(e) => setFilterCategory(e.target.value)}
        data-testid="All-category-filter"
      >
        All
      </button>
      {Object.values(category)[0].slice(0, 5).map(({ strCategory }) =>
        <button
          key={strCategory}
          value={strCategory}
          data-testid={`${strCategory}-category-filter`}
          onClick={(e) => {
            const value = e.target.value;
            if (filterCategory === value) return setFilterCategory('All');
            return setFilterCategory(value);
          }}
        >
          {strCategory}
        </button>,
      )
      }
    </div>
  );
};

export default CategotyFilter;
