import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ResultCard = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Name = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
`;

const Bio = styled.p`
  margin: 0;
  font-size: 14px;
  color: #586069;
`;

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: #586068;
`;

const Star = styled.p`
  margin: 0;
  font-size: 14px;
  color: #A9A910;
`;

const Fork = styled.p`
  margin: 0;
  font-size: 14px;
  color: #586068;
`;

const Author = styled.p`
  margin: 0;
  font-size: 15px;
  color: #886063;
`;

const IdleInfo = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  color: #666;
`;



const SearchResults = () => {
  const { results, loading, error, searchType } = useSelector((state) => state.search);

  // Show state status
  if (loading) {
    return <IdleInfo>Loading...</IdleInfo>;
  }

  if (error) {
    return <IdleInfo>Error: {error.message}</IdleInfo>;
  }

  if (!Array.isArray(results) || results.length === 0) {
    return <IdleInfo>No results found.</IdleInfo>;
  }

  // Show User Results
  const renderUser = (user) => {
    return (
      <ResultCard key={user.id}>
        <Avatar src={user?.avatar_url} alt={`${user?.login}'s avatar`} />
        <Name>{user?.login}</Name>
        <Bio>{user?.bio || 'No bio available'}</Bio>
      </ResultCard>
    )
  }

  // Show Repo Results
  const renderRepo = (repo) => {
    return (
      <ResultCard key={repo.id}>
        <Avatar src={repo?.owner?.avatar_url} alt={`${repo?.name}'s avatar`} />
        <Name>{repo?.name}</Name>
        <Author>Author : {repo?.owner?.login}</Author>
        <Description>Description : {repo?.description}</Description>
        <Star>⭐ : {repo?.stargazers_count}</Star>
        <Fork>Total Fork : {repo?.forks_count}</Fork>
      </ResultCard>
    )
  }

  return (
    <ResultsContainer>
      {results.map((result) => (
        searchType === 'users' ? renderUser(result) : renderRepo(result)
      ))}
    </ResultsContainer>
  );
};

export default SearchResults;