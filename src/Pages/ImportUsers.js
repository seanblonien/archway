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

        const imports = {};
        Object.keys(IMPORT_TYPE).forEach(type => {
            imports[IMPORT_TYPE[type]] = {
                users: [],
                errors: [],
                valid: false
            };
        });

        this.state = {
            type: IMPORT_TYPE.none,
            roles: [],
            imports: imports,
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

    setUsers = (isValid, users) => {
        this.setState(state => {
            if(!isValid){
                let x = 1;
            }
            return state.imports[state.type] = {
                users: users,
                errors: isValid && state.valid ? this.state.imports[this.state.type].errors : [],
                valid: isValid
            };
        });
    };

    importFile = async (e) => {
        e.preventDefault();
        let users = this.state.imports[this.state.type].users.map(user => {
            user.role = this.state.roles.filter(role => role.name === user.role).map(role => role.id)[0];
            if (!user.hasOwnProperty('username')) user['username'] = user.email;
            let p = [...Array(6)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
            if (!user.hasOwnProperty('password')) user['password'] = p;
            return user;
        });

        let stateToSet = this.state.imports[this.state.type];
        for (const user of users) {
            try {
                await strapi.axios.post(strapiURL + '/content-manager/explorer/plugins::users-permissions.user', user);
            } catch (err) {
                console.error(err);
                let msg = err.response.data.message[0].messages[0];
                let errMsg = JSON.stringify(user) + ': ' + msg.id + ': ' + msg.message;
                stateToSet.errors = [...stateToSet.errors, errMsg];
            }
        }
        stateToSet.valid = _.isEmpty(stateToSet.errors);

        this.setState(stateToSet);
        this.setState({importSuccess: stateToSet.valid})
    };

    render() {
        const {importSuccess, type, imports, roles} = this.state;

        return (
            <Box width="50%" mx="auto">
                {importSuccess ?
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
                        <div hidden={type !== IMPORT_TYPE.file}>
                            <ImportDelimit setUsers={this.setUsers} type={IMPORT_TYPE.file}/>
                        </div>
                        <div hidden={type !== IMPORT_TYPE.text}>
                            <ImportDelimit setUsers={this.setUsers} type={IMPORT_TYPE.text}/>
                        </div>

                        {type !== IMPORT_TYPE.none &&
                        <div>
                            <Box>
                                <Typography label="Required Fields">Required fields are:</Typography>
                                <List dense={true}>
                                    {userImport.requiredFields && userImport.requiredFields.map(field =>
                                        <ListItem key={field}>
                                            <ListItemText>{field}</ListItemText>
                                        </ListItem>
                                    )}
                                </List>
                            </Box>

                            <Box>
                                <Typography label="Valid Roles">Valid roles are:</Typography>
                                <List dense={true}>
                                    {roles && roles.map(role =>
                                        <ListItem key={role.name}>
                                            <ListItemText>{role.name}</ListItemText>
                                        </ListItem>
                                    )}
                                </List>
                            </Box>

                            <br/>
                            <Button onClick={this.importFile}
                                    variant="contained"
                                    disabled={!(imports[type] && imports[type].valid)}>Import</Button>

                            {!_.isEmpty(imports[type].errors) &&
                            <Box>
                                <Typography label="Import Errors">Import Errors:</Typography>
                                <List dense={true}>
                                    {imports[type].errors && imports[type].errors.map(err =>
                                        <ListItem key={err}>
                                            <ListItemText>{err}</ListItemText>
                                        </ListItem>
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
