/*
Filename: SearchRedirect.js
Contributors: Ryan Cave
 */

import React from "react";
import {Redirect} from "react-router-dom";

export default class SearchRedirect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redir: this.props.match.params,
        }
    }

    render() {
        if (this.state.redir.searchTerm !== undefined){
            let newPath = "/" + this.state.redir.path + "/" + this.state.redir.searchTerm;
            this.setState({redirectPath: newPath});

            return(
                <div>
                    <Redirect to={newPath}  />
                </div>
            );
        }

        return(
            <div>
                <Redirect to={"/" + this.state.redir.path}  />
            </div>
        );
    }
}