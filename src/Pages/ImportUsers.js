import Divider from '@material-ui/core/Divider';
import {Button, Typography, ButtonGroup} from '@material-ui/core';
import React, {Component} from 'react';
import UploadFile from '../Components/UploadFile';

class ImportUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "csv"
        };
    }

    componentDidMount() {
        this.setState({type: "csv"})
    }

    onClickCSV() {
        this.setState({type: "csv"})
    };

    onClickTab() {
        this.setState({type: "tab"})
    };

    onClickCP() {
        this.setState({type: "cp"})
    };

    renderType(type) {
        let render;

        switch(type){
            case 'tab':
                render = <UploadFile/>;
                break;
            case 'cp':
                render = <UploadFile/>;
                break;
            default:
            case 'csv':
                render = <UploadFile/>;
                break;
        }

        return render;
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={{marginTop: '16px'}}>Import Users</Typography>
                <Divider/>
                <br/>

                <Typography variant="h5">Where do you want to import users from?</Typography>

                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button>CSV</Button>
                    <Button>Tab-delimited</Button>
                    <Button>Copy/paste</Button>
                </ButtonGroup>

                {this.renderType(this.state.type)}

            </div>
        );
    }
}

export default ImportUsers;
