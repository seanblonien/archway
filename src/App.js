import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import {Router} from 'react-router-dom';
import Can from './Components/Can';
import Footer from './Components/Footer';
import Header from './Components/Header/Header';
import {permissions} from './constants';
import AuthProvider from './Contexts/AuthProvider';
import {RolesProvider} from './Contexts/RoleProvider';
import ThemeProvider from './Contexts/ThemeProvider';
import history from './utils/Routing/history';
import routes from './utils/Routing/routes';
import RoutesToRender from './utils/Routing/RoutesToRender';
import Snackbar from './utils/Snackbar';
import root from './utils/styles.module.css';

export default function App () {
  return <>
    <ThemeProvider>
      <CssBaseline>
        <Snackbar>
          <RolesProvider>
            <AuthProvider>
              <Can perform={permissions.users_permissions.userspermissions.init}>
                <Router history={history}>
                  <div className={root.bodyContainer}>
                    <div className={root.bodyContent}>
                      <div>
                        <Header/>
                        <Box mb={1}>
                          <RoutesToRender routes={routes} switch/>
                        </Box>
                      </div>
                    </div>
                    <Footer className={root.bodyFooter}/>
                  </div>
                </Router>
              </Can>
            </AuthProvider>
          </RolesProvider>
        </Snackbar>
      </CssBaseline>
    </ThemeProvider>
  </>;
}
