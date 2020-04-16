import Typography from '@material-ui/core/Typography';
import React from 'react';
import {useQuery} from '../utils/utils';


const SearchResults = () => {
  const query = useQuery().get('search');

  return <Typography>Search Results for: {query}</Typography>;
};

export default SearchResults;
