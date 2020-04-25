import {Box, Grid, List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import Can from '../Components/Can';
import PageWithMargin from '../Components/LayoutWrappers/PageWithMargin';
import AuthContext from '../Contexts/AuthContext';
import {routesPropTypes} from '../utils/PropTypesConfig';
import history from '../utils/Routing/history';
import appRoutes from '../utils/Routing/routes';
import RoutesToRender from '../utils/Routing/RoutesToRender';

const Dashboard = ({routes, match}) => {
  const {user} = useContext(AuthContext);

  if(match === appRoutes.dashboard.path){
    history.push(appRoutes.dashboard.routeNames[0]);
  }

  return (
    <PageWithMargin>
      <Grid container alignItems='flex-start'>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2} component={Paper} my={5}>
          <Box m={2}>
            <Typography variant='h4'>
              Dashboard
            </Typography>
          </Box>
          <List>
            {Object.values(routes).map(({name, Icon, path, permission, genPath}) =>
              <Can perform={permission} key={name}>
                <ListItem button component={Link} to={genPath ? genPath(user.username) : path}>
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
        <Grid item xs={12} sm={12} md={8} lg={9} xl={10}>
          <Box>
            <RoutesToRender routes={routes} hasSwitch={false}/>
          </Box>
        </Grid>
      </Grid>
    </PageWithMargin>
  );
};

Dashboard.propTypes = routesPropTypes;

export default Dashboard;
