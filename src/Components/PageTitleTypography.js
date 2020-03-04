/*
Filename: PageTitleTypography.js
Contributors:
Stephen Tate - Wrote entire file.
 */

import Typography from '@material-ui/core/Typography';
import withWidth from "@material-ui/core/withWidth/withWidth";
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'recompose/compose';

class PageTitleTypography extends React.Component{

    //Resize title text based on screen size
    static resizeTitleText(props) {
        if(props.width === 'xl'){
            return "h1";
        }else if(props.width === 'lg'){
            return "h2";
        }else if(props.width ==='md'){
            return "h3";
        }else if(props.width ==='sm'){
            return "h4"
        }
        return "h6";
    }

    render() {
        if (this.props.size) {
            return (<Typography align={this.props.align} variant={this.props.size}>
                <b>{this.props.text}</b>
            </Typography>)
        }
        else {
            return (
                <Typography align={this.props.align} variant={PageTitleTypography.resizeTitleText(this.props)}>
                    <b>{this.props.text}</b>
                </Typography>
            );
        }
    }
}

PageTitleTypography.propTypes = {
    text: PropTypes.string,
    align: PropTypes.string,
};

PageTitleTypography.defaultProps = {
    align: "center",
};

export default compose(
    withWidth(),
)(PageTitleTypography);
