/*
Filename: FilterBar.js
Contributors: Ryan Cave
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import {strapi} from "../constants";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
});

class NativeSelects extends React.Component {

    state = {
        department: '',
        sponsor: '',
        redirectPath: "/SearchRedirect/Capstones/",
        redirect: false,
        capstones: [],
        departmentList: [],
        sponsorList: [],
    };

    async componentDidMount() {
        const posts = await strapi.getEntries('capstones');
        this.setState({capstones: posts});
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        let newPath = this.state.redirectPath + event.target.value;
        this.setState({redirect: true});
        this.setState({redirectPath: newPath})
    };

    render() {
        const { classes } = this.props;

        if (this.state.redirect === true){
            return(
                <Redirect to={this.state.redirectPath}  />
            )
        }

        for (let i = 0; i < this.state.capstones.length; i++){
            if (!this.state.departmentList.includes(this.state.capstones[i].department.name)){
                this.state.departmentList.push(this.state.capstones[i].department.name);
            }

            for(let j = 0; j < this.state.capstones[i].sponsors.length; j++) {
                if (!this.state.sponsorList.includes(this.state.capstones[i].sponsors[j].name)){
                    this.state.sponsorList.push(this.state.capstones[i].sponsors[j].name);
                }
            }
        }

        return (
            <div className={classes.root} >
                <Paper className={classes.paper} >
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Department</InputLabel>
                        <Select
                            native
                            value={this.state.department}
                            onChange={this.handleChange('department')}
                        >
                            <option value='' />
                            {this.state.departmentList.map(name => (
                                <option value={name}>{name}</option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Sponsor</InputLabel>
                        <Select
                            native
                            value={this.state.sponsor}
                            onChange={this.handleChange('sponsor')}
                        >
                            <option value='' />
                            {this.state.sponsorList.map(name => (
                                <option value={name}>{name}</option>
                            ))}
                        </Select>
                    </FormControl>
                </Paper>
            </div>
        );
    }
}

NativeSelects.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelects);