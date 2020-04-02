import {Box, ListItemText, Typography, Paper, ListItem, List, Grid} from '@material-ui/core';
import React from 'react';
import {Link, Route} from 'react-router-dom';
import CreateCapstone from './CreateCapstone';
import ImportUsers from './ImportUsers';
import ViewYourCapstones from './ViewYourCapstones';

const routes = [
  {
    name: 'View Capstones',
    path: '/view-capstones',
    Component: ViewYourCapstones
  },
  {
    name: 'Create Capstone',
    path: '/create-capstones',
    Component: CreateCapstone
  },
  {
    name: 'Import Users',
    path: '/import-users',
    Component: ImportUsers
  },
];

const Dashboard = ({match}) => (
  <Grid container alignContent='flex-start' alignItems='flex-start'>
    <Grid item xs={3}>
      <Paper  mx={5}>
        <Typography variant='h3'>
          Dashboard Navigation
        </Typography>
        <List>
          {routes.map(({name, path}) =>
            <ListItem key={name} component={Link} to={`${match.path}${path}`}>
              <ListItemText>
                {name}
              </ListItemText>
            </ListItem>
          )}
        </List>
      </Paper>
    </Grid>
    <Grid item xs={9}>
      <Box>
        {routes.map(({path, Component}) =>
          <Route key={path} path={`${match.path}${path}`} component={Component}/>
        )}
      </Box>
    </Grid>
  </Grid>
);

export default Dashboard;
