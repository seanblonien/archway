/*
Filename: SearchBar.js
Contributors: Ryan Cave
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Redirect, withRouter } from 'react-router-dom';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit,
        width: 250,
        placeholder: "Search..."
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    input: {
        color: 'white',
    }
});

class TextFields extends React.Component {
    constructor(props) {
        super(props);
        this.keyPress = this.keyPress.bind(this);
        this.state = {
            input: '',
            redirect: false,
            redirectPath: "/SearchRedirect/"
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    keyPress(e){
        if(e.keyCode === 13){
            let newPath = this.state.redirectPath;

            if (window.location.pathname.includes("ViewSponsors")){
                newPath += "ViewSponsors/" + e.target.value;
            }
            else {
                newPath += "Capstones/" + e.target.value;
            }

            console.log(newPath);

            this.setState(() => ({
                redirect: true,
                redirectPath: newPath,
            }))

        }
    }

    render() {
        const { classes } = this.props;

        if (this.state.redirect === true){
            return(
                <Redirect to={this.state.redirectPath}  />
            )
        }

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="standard-name"
                    placeholder="Search..."
                    className={classes.textField}
                    value={this.state.input}
                    onChange={this.handleChange('input')}
                    margin="normal"
                    onKeyDown={this.keyPress}
                    InputProps={{
                        className: classes.input
                    }}
                />
            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default withRouter(withStyles(styles)(TextFields));