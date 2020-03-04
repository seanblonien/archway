/*
Filename: FontAwesome.js
Contributors:
Stephen Tate - Wrote entire file
 */

import Icon from '@material-ui/core/Icon';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import {loadCSS} from 'fg-loadcss/src/loadCSS';
import PropTypes from 'prop-types';
import React from 'react';
import './RegisterModal.css';


const styles = theme => ({
    icon: {
        marginLeft: theme.spacing.unit * 2,
        alignSelf: 'baseline',
        position: 'relative',
    },
});


class FontAwesome extends React.Component {

    componentDidMount() {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#insertion-point-jss'),
        );
    }

    render() {
        const { classes , theme } = this.props;

        return (
            <div className="MaterialIcons">
                <Icon className={classNames(classes.icon, `fa fa-${theme}`)} />
            </div>
        );
    }
}

FontAwesome.defaultProps = {
    theme: "secondary",
    label: "Button Text"

};

FontAwesome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FontAwesome);
