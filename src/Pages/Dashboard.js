import {Box, ListItemText, Typography, Paper, ListItem, List, Grid} from '@material-ui/core';
import React from 'react';
import {Link} from 'react-router-dom';
import {routesPropTypes} from '../utils/PropTypesConfig';
import RoutesToRender from '../utils/Routing/RoutesToRender';

const Dashboard = ({routes}) => (
  <Grid container alignContent='flex-start' alignItems='flex-start'>
    <Grid item xs={3}>
      <Paper mx={5}>
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
        <RoutesToRender routes={routes}/>
      </Box>
    </Grid>
  </Grid>
);

Dashboard.propTypes = routesPropTypes;

export default Dashboard;
