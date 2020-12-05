import React from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({searchInputValue, setSearchInputValue}) => {
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={searchInputValue} onChange={(e) => setSearchInputValue(e.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
