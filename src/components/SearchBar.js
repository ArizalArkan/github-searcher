import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setQuery, setSearchType, searchUsers, searchRepositories, setCurrentPage } from '../redux/searchSlice';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: stretch;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SearchInput = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  width: 100%;
  margin-bottom: 10px;
  outline: none;
  border-radius: 4px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    width: 60%; 
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

const SearchTypeSelect = styled.select`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  background-color: #fff;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
  outline: none;

  @media (min-width: 768px) {
    width: 12%; 
  }
`;

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const SearchBar = () => {
  const dispatch = useDispatch();
  const { query, searchType, currentPage } = useSelector((state) => state.search);
  const debouncedQuery = useDebounce(query, 300);

  const performSearch = useCallback((searchQuery, type, page = 1) => {
    if (searchQuery) {
      if (type === 'users') {
        dispatch(setCurrentPage(page));
        dispatch(searchUsers({ query: searchQuery, page }));
      } else {
        dispatch(searchRepositories({ query: searchQuery, page }));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    performSearch(debouncedQuery, searchType, currentPage);
  }, [debouncedQuery, searchType, currentPage, performSearch]);

  const handleInputChange = (e) => {
    dispatch(setQuery(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleTypeChange = (e) => {
    dispatch(setSearchType(e.target.value));
    dispatch(setCurrentPage(1));
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Type to search users or repositories"
        value={query}
        onChange={handleInputChange}
      />
      <SearchTypeSelect value={searchType} onChange={handleTypeChange}>
        <option value="users">Users</option>
        <option value="repositories">Repositories</option>
      </SearchTypeSelect>
    </SearchContainer>
  );
};

export default SearchBar;