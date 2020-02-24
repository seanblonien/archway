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
import ImportDelimit from '../Components/ImportDelimit';
import _ from 'lodash';

export const IMPORT_TYPE = {
    'none': 0,
    'file': 1,
    'text': 2
};

class ImportUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: IMPORT_TYPE.none,
            roles: [],
            canImport: false,
            users: undefined,
            importErrors: [],
            importSuccess: false
        };
    }

    async componentDidMount() {
        let roles = await strapi.axios.get(strapiURL + '/users-permissions/roles');
        this.setState({roles: roles.data.roles});
    }

    onClickTypeHandle = (type) => {
        this.setState({type: type});
    };

    setUsers = (canImport, users) => {
        this.setState({
            canImport: canImport,
            users: users,
            importErrors: canImport ? this.state.importErrors : []
        });
    };

    importFile = async (e) => {
        e.preventDefault();
        let users = this.state.users.map(user => {
            user.role = this.state.roles.filter(role => role.name === user.role).map(role => role.id)[0];
            if (!user.hasOwnProperty('username')) user['username'] = user.email;
            let p = [...Array(6)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
            if (!user.hasOwnProperty('password')) user['password'] = p;
            return user;
        });

        let stateToSet = this.state;
        for (const user of users) {
            console.log(user);
            console.log(this.state.roles);
            try {
                await strapi.axios.post(strapiURL + '/content-manager/explorer/plugins::users-permissions.user', user);
            } catch (err) {
                console.error(err);
                let msg = err.response.data.message[0].messages[0];
                let errMsg = JSON.stringify(user) + ': ' + msg.id + ': ' + msg.message;
                stateToSet.importErrors = [...this.state.importErrors, errMsg];
            }
        }
        stateToSet.importSuccess = _.isEmpty(stateToSet.importErrors);

        this.setState(stateToSet);
    };

    render() {
        return (
            <Box width="50%" mx="auto">
                {this.state.importSuccess ?
                    <div>
                        <Typography variant="h4" style={{marginTop: '16px'}}>Import Successful ✅</Typography>
                    </div>
                    :
                    <div>
                        <Typography variant="h4" style={{marginTop: '16px'}}>Import Users</Typography>
                        <Divider/>
                        <br/>

                        <Typography variant="h5">Where do you want to import users from?</Typography>

                        <ButtonGroup variant="contained"
                                     color="primary"
                                     aria-label="contained primary button group">
                            <Button onClick={() => this.onClickTypeHandle(IMPORT_TYPE.file)}>CSV or Delimited File</Button>
                            <Button onClick={() => this.onClickTypeHandle(IMPORT_TYPE.text)}>Copy/paste</Button>
                        </ButtonGroup>

                        {/* Use hidden to conditionally render to keep state
                     persistent and prevent unmounting when switching types*/}
                        <div hidden={this.state.type !== IMPORT_TYPE.file}>
                            <ImportDelimit setUsers={this.setUsers} type={IMPORT_TYPE.file}/>
                        </div>
                        <div hidden={this.state.type !== IMPORT_TYPE.text}>
                            <ImportDelimit setUsers={this.setUsers} type={IMPORT_TYPE.text}/>
                        </div>

                        {this.state.type !== IMPORT_TYPE.none &&
                        <div>
                            <Box>
                                <Typography label="Required Fields">Required
                                    fields are:</Typography>
                                <List dense={true}>
                                    {userImport.requiredFields && userImport.requiredFields.map(field =>
                                        <ListItem
                                            key={field}><ListItemText>{field}</ListItemText></ListItem>
                                    )}
                                </List>
                            </Box>

                            <Box>
                                <Typography label="Valid Roles">Valid roles
                                    are:</Typography>
                                <List dense={true}>
                                    {this.state.roles && this.state.roles.map(role =>
                                        <ListItem
                                            key={role.name}><ListItemText>{role.name}</ListItemText></ListItem>
                                    )}
                                </List>
                            </Box>

                            <br/>
                            <Button onClick={this.importFile}
                                    variant="contained"
                                    disabled={!this.state.canImport}
                            >Import</Button>

                            {!_.isEmpty(this.state.importErrors) &&
                            <Box>
                                <Typography label="Import Errors">Import
                                    Errors:</Typography>
                                <List dense={true}>
                                    {this.state.importErrors && this.state.importErrors.map(err =>
                                        <ListItem
                                            key={err}><ListItemText>{err}</ListItemText></ListItem>
                                    )}
                                </List>
                            </Box>
                            }
                        </div>
                        }
                    </div>
                }
            </Box>
        );
    }
}

export default ImportUsers;
