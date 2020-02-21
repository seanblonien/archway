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

class ImportUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            roles: []
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

    setUsers = users => {
        this.users = users;
    };

    renderType(type) {
        let render;

        switch(type){
            case 'tab':
                render = <div></div>;
                break;
            case 'cp':
                render = <div></div>;
                break;
            case 'csv':
                render = <ImportCSV setUsers={this.setUsers}/>;
                break;
            default:
                render = <div></div>;
        }

        return render;
    }

    importFile = async () => {
        for(const user of this.users) {
            await strapi.axios.post(strapiURL + '', user);
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

                {this.renderType(this.state.type)}

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
                <Button onClick={this.importFile} variant="contained">Import</Button>
            </div>
        );
    }
}

export default ImportUsers;
