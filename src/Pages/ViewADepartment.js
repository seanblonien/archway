/*
Filename: ViewADepartment.js
Contributors:
Brenden Detels - Wrote entire page.
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import LoadingCircle from '../Components/LoadingCircle.js';

import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import {strapi} from "../constants";
import Button from '@material-ui/core/Button';

const styles = {
    card: {
        raised: true,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 100,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
};

class ViewADepartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            departments: []
        }
    }
    async componentDidMount() {
        const posts = await strapi.getEntries('Departments');
        this.setState({loading: false, departments: posts});
    }

    render() {

        if (!this.state.loading) {

            var department;

            var obj;
            for (var key in this.state.departments){
                obj = this.state.departments[key];
                for( let prop in obj){
                    if(prop === 'id'){
                        if(this.props.match.params.id === obj[prop]){
                            department = obj;
                        }
                    }
                }
            }

            return (
                <div className="ViewASponsor">

                    <Typography align={"center"}>
                        <h1>{department['name']}</h1>

                    </Typography>

                    <Typography>
                        {"Currently involved in " + department['capstones'].length + " capstones"}
                    </Typography>

                    <Typography>
                        <h4>{department['description']}</h4>
                    </Typography>


                    <Typography align={"center"}>

                        <h1> All Capstones by {department['name']}</h1>
                    </Typography>

                    {department['capstones'].map((result, i) => (
                        <Button href={"/ViewCapstone/" + result.CapstoneName}>
                            <Typography>
                                <h1>{result.CapstoneName}</h1>

                            </Typography>
                        </Button>
                    ))}

                </div>
            );
        }
        else{
            return (<div>
                < LoadingCircle />
            </div>);
        }
    }
}
export default compose(
    withStyles(styles),
    withWidth(),
)(ViewADepartment);