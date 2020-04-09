import {Box, Button, ButtonGroup, Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import React, {Component} from 'react';
import AddUser from '../AddUser';
import ImportDelimit from './ImportDelimit';
import {USER_IMPORT_TYPE} from '../../constants';

class ImportUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: USER_IMPORT_TYPE.none
    };
  }

  onClickTypeHandle = (type) => {
    this.setState({type});
  };

  render() {
    const {type} = this.state;

    return (
      <Box width='50%' mx='auto'>
        <div>
          <Typography variant='h4' style={{marginTop: '16px'}}>Import Users</Typography>
          <Divider/>
          <br/>

          <Typography variant='h5'>Where do you want to import users from?</Typography>

          <ButtonGroup
            variant='contained'
            color='primary'
            aria-label='contained primary button group'
          >
            <Button onClick={() => this.onClickTypeHandle(USER_IMPORT_TYPE.file)}>CSV or tab-delimited text file</Button>
            <Button onClick={() => this.onClickTypeHandle(USER_IMPORT_TYPE.text)}>Copy/paste from file</Button>
            <Button onClick={() => this.onClickTypeHandle(USER_IMPORT_TYPE.manual)}>Manual entry</Button>
          </ButtonGroup>

          {/* Use hidden to conditionally render to keep state
                 persistent and prevent unmounting when switching types */}
          <Box
            hidden={type !== USER_IMPORT_TYPE.file}
            marginTop='10px'
          >
            <ImportDelimit type={USER_IMPORT_TYPE.file}/>
          </Box>
          <Box hidden={type !== USER_IMPORT_TYPE.text}>
            <ImportDelimit type={USER_IMPORT_TYPE.text}/>
          </Box>
          <Box hidden={type !== USER_IMPORT_TYPE.manual}>
            <AddUser/>
          </Box>
        </div>
      </Box>
    );
  }
}

export default ImportUsers;
