/*
Filename: FilterBar.js
Contributors: Ryan Cave
 */

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Redirect} from 'react-router-dom';
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
        const capstones = await strapi.getEntries('capstones');
        const sponsors = capstones.filter(capstone => !_.isEmpty(capstone.sponsors))
            .flatMap(capstone => capstone.sponsors)
            .map(s => s.name);
        const departments = capstones.filter(capstone => !_.isEmpty(capstone.department))
            .flatMap(capstone => capstone.department)
            .map(d => d.name);

        this.setState({capstones: capstones, sponsorList: sponsors, departmentList: departments});
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
                                <option value={name} key={name}>{name}</option>
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
                                <option value={name} key={name}>{name}</option>
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
