import React from 'react';
import Table from './components/Table';
import Filters from './components/Filters';
import StoreProvider from './context/StoreProvider';

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <header className="App-header">
          <Filters />
          <Table />
        </header>
      </div>
    </StoreProvider>
  );
}

export default App;
