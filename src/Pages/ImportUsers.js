import Divider from '@material-ui/core/Divider';
import {
    Button,
    Typography,
    ButtonGroup,
    List,
    ListItemText, Box
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import React, {Component} from 'react';
import {strapi, strapiURL, userImport} from '../constants';
import ImportCSV from '../Components/ImportCSV';
import _ from 'lodash';

class ImportUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            roles: [],
            canImport: false,
            users: undefined
        };
    }

    async componentDidMount() {
        let roles = await strapi.axios.get(strapiURL + '/users-permissions/roles');
        roles = roles.data.roles.map(role => role.name);
        this.setState({roles: roles});
    }

    onClickCSV = () => {
        this.setState({type: "csv"})
    };

    onClickTab = () => {
        this.setState({type: "tab"})
    };

    onClickCP = () => {
        this.setState({type: "cp"})
    };

    setUsers = (canImport, users) => {
        this.setState({canImport: canImport, users: users})
    };

    importFile = async () => {
        for(const user of this.state.users) {
            let x = 1;
            let response = await strapi.axios.post(strapiURL + '', user);
            let y = x;
        }
    };

    render() {
        return (
            <div>
                <Typography variant="h4" style={{marginTop: '16px'}}>Import Users</Typography>
                <Divider/>
                <br/>

                <Typography variant="h5">Where do you want to import users from?</Typography>

                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button onClick={this.onClickCSV}>CSV</Button>
                    <Button onClick={this.onClickTab}>Tab-delimited</Button>
                    <Button onClick={this.onClickCP}>Copy/paste</Button>
                </ButtonGroup>

                {/* Use hidden to conditionally render to keep state
                 persistent and prevent unmounting when switching types*/}
                <div hidden={this.state.type !== 'csv'}>
                    <ImportCSV setUsers={this.setUsers}/>
                </div>
                <div hidden={this.state.type !== 'cp'}>
                    cp
                </div>
                <div hidden={this.state.type !== 'tab'}>
                    tab
                </div>

                <Typography label="Required Fields">
                    Required CSV fields are: {userImport.requiredFields.join(', ')}
                </Typography>

                <Typography label="Valid Roles">Valid roles are</Typography>

                <Box border={1} width={150}>
                    <List dense={true}>
                        {this.state.roles && this.state.roles.map(role =>
                            <ListItem key={role}><ListItemText>{role}</ListItemText></ListItem>
                        )}
                    </List>
                </Box>

                <br/>
                <Button onClick={this.importFile}
                        variant="contained"
                        disabled={!this.state.canImport}
                >Import</Button>
            </div>
        );
    }
}

export default ImportUsers;
