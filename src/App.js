import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

const searchClient = algoliasearch(
  'O24BZ26O5Y',
  'b0c257e6ba7b3b033e60e1d9d93d40c6'
);

function App() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">App</a>
        </h1>
        <p className="header-subtitle">Google Docs Search</p>
      </header>

      <div className="container">
        <InstantSearch searchClient={searchClient} indexName="GoogleDocsIndex">
          <div className="search-panel">
            <div className="search-panel__results">
              <SearchBox
                className="searchbox"
                translations={{
                  placeholder: '',
                }}
              />
              <Hits hitComponent={Hit} />

              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

function Hit(props) {
  const [highlighted, setHighlighted] = useState(false);

  return (
    <a
      href={`https://docs.google.com/document/d/${props.hit.googleId}/edit#heading=${props.hit.headingId}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: '#000' }}
      onClick={() => setHighlighted(hl => !hl)}
      className="hit-box hit-box-link"
    >
      <article className={highlighted ? 'hit-box-highlight' : ''}>
        <h1>
          <Highlight attribute="name" hit={props.hit} />
          {' – '}
          <Highlight attribute="headingContent" hit={props.hit} />
        </h1>
        <p>
          <Highlight attribute="content" hit={props.hit} />
        </p>
      </article>
    </a>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
