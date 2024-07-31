import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import styled from 'styled-components';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Pagination from './components/Pagination';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppContainer>
            <Header />
            <SearchBar />
            <Routes>
              <Route path="/" element={<SearchResults />} />
            </Routes>
            <Pagination />
          </AppContainer>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;