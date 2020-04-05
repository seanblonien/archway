import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {permissions} from './constants';
import {RolesProvider} from './Contexts/RolesContext';
import ProtectedRoute from './utils/ProtectedRoute';
import About from './Components/About';
import Footer from './Components/Footer';
import Header from './Components/Header/Header';
import Register from './Components/RegisterModal';
import SearchRedirect from './Components/SearchRedirect';
import Capstone from './Pages/Capstones';
import CreateCapstone from './Pages/CreateCapstone';
import FAQ from './Pages/FAQ';
import Home from './Pages/Home';
import ImportUsers from './Pages/ImportUsers';
import LoginPage from './Pages/LoginPage';
import NotFound from './Pages/NotFound';
import Sponsors from './Pages/Sponsors';
import ViewADepartment from './Pages/ViewADepartment';
import ViewAllDepartments from './Pages/ViewAllDepartments';
import ViewASponsor from './Pages/ViewASponsor';
import ViewCapstone from './Pages/ViewCapstone';
import ViewProfile from './Pages/ViewProfile';
import ViewSponsors from './Pages/ViewSponsors';
import ViewUser from './Pages/ViewUser';
import ViewYourCapstones from './Pages/ViewYourCapstones';
import ViewYourCapstonesSponsors from './Pages/ViewYourCapstonesSponsors';
import history from './utils/history';
import Can from './Components/Can';
import AuthProvider from './Contexts/AuthProvider';

export default function App () {
  return <>
    <RolesProvider>
      <AuthProvider>
        <Can perform={permissions.users_permissions.userspermissions.init}>
          <Router history={history}>
            <div className='App' style={{minHeight: '100vh', position: 'relative'}}>
              <Header/>
              <div style={{paddingBottom: '140px'}}>
                <Switch>
                  <Route path='/login' component={LoginPage}/>
                  <Route path='/SearchRedirect/:path/:searchTerm?' component={SearchRedirect}/>
                  <Route path='/Capstones/:searchTerm?' component={Capstone}/>
                  <Route path='/About' component={About}/>
                  <Route path='/Register' component={Register}/>
                  <Route path='/ViewCapstone/:capstoneID' component={ViewCapstone}/>
                  <Route path='/ViewUser/:username' component={ViewUser}/>
                  <Route path='/Sponsors' component={Sponsors}/>
                  <Route path='/ViewSponsors/:searchTerm?' component={ViewSponsors}/>
                  <Route path='/ViewASponsor/:id' component={ViewASponsor}/>
                  <Route path='/ViewAllDepartments' component={ViewAllDepartments}/>
                  <Route path='/ViewADepartment/:id' component={ViewADepartment}/>
                  <Route path='/FAQ' component={FAQ}/>
                  <Route path='/ViewProfile/:username' component={ViewProfile}/>
                  <ProtectedRoute path='/CreateCapstone' component={CreateCapstone}/>
                  <ProtectedRoute path='/ViewYourCapstones' component={ViewYourCapstones}/>
                  <ProtectedRoute path='/ViewYourCapstonesSponsors' component={ViewYourCapstonesSponsors}/>
                  <ProtectedRoute path='/ImportUsers' component={ImportUsers}/>
                  <Route exact path='/' component={Home}/>
                  <Route path='*' component={NotFound}/>
                </Switch>
              </div>
              <Footer/>
            </div>
          </Router>
        </Can>
      </AuthProvider>
    </RolesProvider>
  </>;
}
