import React from 'react';
import {useQuery} from '../utils/utils';
import ResultsList from '../Components/Search/ResultsList';


const SearchResults = () => {
  const query = useQuery().get('search');

  return <ResultsList query={query}/>;
};

export default SearchResults;
