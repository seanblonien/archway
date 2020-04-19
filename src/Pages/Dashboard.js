import {Box, ListItemText, Typography, Paper, ListItem, List, Grid} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import Can from '../Components/Can';
import AuthContext from '../Contexts/AuthContext';
import {routesPropTypes} from '../utils/PropTypesConfig';
import RoutesToRender from '../utils/Routing/RoutesToRender';

const Dashboard = ({routes}) => {
  const {user} = useContext(AuthContext);

  return (
    <Grid container direction='row' alignItems='flex-start' component={Box} m={5}>
      <Grid item xs={12} sm={12} md={4} lg={2} xl={2} component={Paper} my={5}>
        <Box m={2}>
          <Typography variant='h4'>
            Dashboard
          </Typography>
        </Box>
        <List>
          {Object.values(routes).map(({name, Icon, path, permission, genPath}) =>
            <Can perform={permission} key={name}>
              <ListItem component={Link} to={genPath ? genPath(user.username) : path}>
                <ListItemIcon>
                  <Icon/>
                </ListItemIcon>
                <ListItemText>
                  {name}
                </ListItemText>
              </ListItem>
            </Can>
          )}
        </List>
      </Grid>
      <Grid item xs={12} sm={12} md={8} xl={10}>
        <Box>
          <RoutesToRender routes={routes}/>
        </Box>
      </Grid>
    </Grid>
  );
};

Dashboard.propTypes = routesPropTypes;

export default Dashboard;
