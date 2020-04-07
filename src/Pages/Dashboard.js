import {Box, ListItemText, Typography, Paper, ListItem, List, Grid} from '@material-ui/core';
import React from 'react';
import {Link} from 'react-router-dom';
import RouteWithSubRoutes from '../utils/Routing/RouteWithSubRoutes';

const Dashboard = ({routes}) => (
  <Grid container alignContent='flex-start' alignItems='flex-start'>
    <Grid item xs={3}>
      <Paper  mx={5}>
        <Typography variant='h3'>
          Dashboard Navigation
        </Typography>
        <List>
          {routes.map(({name, path}) =>
            <ListItem key={name} component={Link} to={path}>
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
        {routes.map((route) =>
          <RouteWithSubRoutes key={route.path} {...route}/>
        )}
      </Box>
    </Grid>
  </Grid>
);

export default Dashboard;
