import {Box, Button, ButtonGroup, Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import React, {Component} from 'react';
import AddUser from '../Components/AddUser';
import ImportDelimit from '../Components/ImportDelimit';

export const IMPORT_TYPE = {
    'none': 0,
    'file': 1,
    'text': 2,
    'manual': 3
};

class ImportUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: IMPORT_TYPE.none
        }
    }

    onClickTypeHandle = (type) => {
        this.setState({type: type});
    };

    render() {
        const {type} = this.state;

        return (
            <Box width="50%" mx="auto">
                <div>
                    <Typography variant="h4" style={{marginTop: '16px'}}>Import Users</Typography>
                    <Divider/>
                    <br/>

                    <Typography variant="h5">Where do you want to import users from?</Typography>

                    <ButtonGroup variant="contained"
                                 color="primary"
                                 aria-label="contained primary button group">
                        <Button onClick={() => this.onClickTypeHandle(IMPORT_TYPE.file)}>CSV or tab-delimited text file</Button>
                        <Button onClick={() => this.onClickTypeHandle(IMPORT_TYPE.text)}>Copy/paste from file</Button>
                        <Button onClick={() => this.onClickTypeHandle(IMPORT_TYPE.manual)}>Manual entry</Button>
                    </ButtonGroup>

                    {/* Use hidden to conditionally render to keep state
                 persistent and prevent unmounting when switching types*/}
                    <Box hidden={type !== IMPORT_TYPE.file}
                         marginTop="10px">
                        <ImportDelimit type={IMPORT_TYPE.file}/>
                    </Box>
                    <Box hidden={type !== IMPORT_TYPE.text}>
                        <ImportDelimit type={IMPORT_TYPE.text}/>
                    </Box>
                    <Box hidden={type !== IMPORT_TYPE.manual}>
                        <AddUser/>
                    </Box>
                </div>
            </Box>
        );
    }
}

export default ImportUsers;
