/*
Filename: App.js
Contributors:
Ryan Cave - Created first iteration of App.js, added routing for searching & several other pages.
Parker Wagner - Reworked some routes when authentication was finished.
Brenden Detels - Routing Functionality
 */

import React, {Component, Fragment} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import About from './Components/About';
import Footer from "./Components/Footer";
import Header from './Components/Header/Header';
import Register from "./Components/RegisterModal";
import ViewCapstone from "./Pages/ViewCapstone";
import NotFound from "./Pages/NotFound";
import SearchRedirect from "./Components/SearchRedirect";
import Callback from "./Pages/Callback";
import Capstone from "./Pages/Capstones";
import CreateCapstone from './Pages/CreateCapstone';
import EditCapstone from "./Pages/EditCapstone";
import FAQ from "./Pages/FAQ";
import Home from "./Pages/Home";
import ImportUsers from './Pages/ImportUsers';
import Login from "./Pages/login";
import Secret from "./Pages/Secret";
import Sponsors from "./Pages/Sponsors";
import ViewADepartment from "./Pages/ViewADepartment";
import ViewYourCapstonesSponsors from "./Pages/ViewYourCapstonesSponsors";
import ViewProfile from "./Pages/ViewProfile";
import ViewSponsors from "./Pages/ViewSponsors";
import ViewUser from "./Pages/ViewUser";
import ViewYourCapstones from "./Pages/ViewYourCapstones";
import ViewASponsor from "./Pages/ViewASponsor";
import ViewAllDepartments from "./Pages/ViewAllDepartments";

export default class extends Component {
  render() {

    return <Fragment>
        <Router>
            <div className="App" style={{minHeight: '100vh', position: 'relative'}}>
                < Header {...this.props} />
                <div style={{paddingBottom: '140px'}}>
                <Switch>
                    <Route path="/login" render={()=><Login {...this.props}/>} />
                    {this.props.auth.isAuthenticated() && <Route path="/secret" render={()=><Secret {...this.props}/>} />}
                    <Route path="/callback" render={()=><Callback {...this.props}/>} />
                    <Route path="/SearchRedirect/:path/:searchTerm?" component={SearchRedirect}/>
                    <Route path="/Capstones/:searchTerm?" component={Capstone}/>
                    <Route path="/about" component={About}/>
                    {this.props.auth.isAuthenticated() && <Route path="/CreateCapstone" render={()=><CreateCapstone {...this.props}/>}/>}
                    <Route path="/Register" component={Register}/>
                    <Route path="/ViewCapstone/:capstoneID" component={ViewCapstone}/>
                    <Route path="/ViewUser/:username" component={ViewUser}/>
                    <Route path="/ViewProfile/:username" component={ViewProfile}/>
                    <Route path="/ViewYourCapstones/" component={ViewYourCapstones} />
                    <Route path="/ViewYourCapstonesSponsors/" component={ViewYourCapstonesSponsors} />
                    <Route path="/Sponsors/" component={Sponsors} />
                    <Route path="/ViewSponsors/:searchTerm?" component={ViewSponsors} />
                    <Route path="/ViewASponsor/:id" component={ViewASponsor}/>
                    <Route path="/ViewAllDepartments/" component={ViewAllDepartments}/>
                    <Route path="/ViewADepartment/:id" component={ViewADepartment}/>
                    <Route path="/EditCapstone/:id" component={EditCapstone}/>
                    <Route path="/FAQ/" component={FAQ}/>
                    <Route path="/ImportUsers/" component={ImportUsers}/>
                    <Route exact path="" component={Home}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
                </div>
                <Footer/>
            </div>
        </Router>
    </Fragment>
  }
}
