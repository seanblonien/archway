/*
Filename: PageTitleTypography.js
Contributors:
Stephen Tate - Wrote entire file.
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withWidth from "@material-ui/core/withWidth/withWidth";

class PageTitleTypography extends React.Component{

    constructor(props){
        super(props);
    }

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
        return (
            <Typography align={this.props.align} variant={PageTitleTypography.resizeTitleText(this.props)}>
                <b>{this.props.text}</b>
            </Typography>
        );
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