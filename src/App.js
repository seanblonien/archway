import React, {useState} from 'react';
import {Router} from 'react-router-dom';
import Can from './Components/Can';
import Footer from './Components/Footer';
import Header from './Components/Header/Header';
import MarkdownEditor from './Components/Markdown/MarkdownEditor';
import {permissions} from './constants';
import AuthProvider from './Contexts/AuthProvider';
import {RolesProvider} from './Contexts/RolesContext';
import history from './utils/Routing/history';
import routes from './utils/Routing/routes';
import RoutesToRender from './utils/Routing/RoutesToRender';
import Snackbar from './utils/Snackbar';

export default function App () {
  const [value, setValue] = useState('');

  return <>
    <Snackbar>
      <RolesProvider>
        <AuthProvider>
          <Can perform={permissions.users_permissions.userspermissions.init}>
            <Router history={history}>
              <div className='App' style={{minHeight: '100vh', position: 'relative'}}>
                <Header/>
                <MarkdownEditor setValue={setValue} value={value}/>
                <div style={{paddingBottom: '140px'}}>
                  <RoutesToRender routes={routes} switch/>
                </div>
                <Footer/>
              </div>
            </Router>
          </Can>
        </AuthProvider>
      </RolesProvider>
    </Snackbar>
  </>;
}
