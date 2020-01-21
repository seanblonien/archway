/*
Filename: About.js
Contributors:
Stephen Tate - Wrote entire file.
 */

import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import compose from 'recompose/compose';
import withWidth from "@material-ui/core/withWidth/withWidth";
import Divider from '@material-ui/core/Divider';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import {strapi} from "../constants";
import LoadingCircle from "./LoadingCircle";

const styles = theme => ({
    card: {
        marginTop: '1%',
    },
    leftColCard: {
        marginTop: '1%',
    },
});

class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            sponsors: []
        }
    }

    async componentDidMount() {
        const sponsors1 = await strapi.getEntries('Sponsors');

        this.setState({loading: false, sponsors: sponsors1});

    }

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

    static resizeSubheadingText(props){
        if(props.width === 'xl'){
            return "h4";
        }else if(props.width === 'lg'){
            return "h5";
        }else if(props.width ==='md'){
            return "h5";
        }else if(props.width ==='sm'){
            return "h6"
        }
        return "subtitle1";
    }

    //Ensures margin is there when screen is large and dissapears when screen resizes to below md and col resizes
    setLeftColClass(props){
        const {classes} = this.props;
        if(props.width === 'xl'){
            return classes.leftColCard;
        }else if(props.width === 'lg'){
            return classes.leftColCard;
        }else if(props.width ==='md'){
            return classes.leftColCard;
        }else if(props.width ==='sm'){
            return classes.card
        }
        return classes.card;
    }

    static resizeSubheadingText(props){
        if(props.width === 'xl'){
            return "h4";
        }else if(props.width === 'lg'){
            return "h5";
        }else if(props.width ==='md'){
            return "h5";
        }else if(props.width ==='sm'){
            return "h6"
        }
        return "subtitle1";
    }

    static resizePostContentText(props){
        if(props.width === 'xl'){
            return "body1";
        }else if(props.width === 'lg'){
            return "body1";
        }else if(props.width ==='md'){
            return "body1";
        }else if(props.width ==='sm'){
            return "body1"
        }
        return "body2";
    }

    createBubbleGraphData(){
        let data = [];
        this.state.sponsors.map((result, i) => (
            data.push({label: result['name'], value: result['capstones'].length})
        ));
        return data;
    }

    bubbleClickFun = (label) =>{
        let sponsors = [];
        this.state.sponsors.map((result, i) => (
            sponsors.push(result)
        ));

        for(let name in sponsors){
            if(sponsors[name]['name'] === label){
                window.location = "/ViewASponsor/" + sponsors[name]['id'];
            }
        }
    };

    render() {
        const { classes } = this.props;
        if(!this.state.loading) {
            return (
                <div>
                    <Grid container justify="center">
                        <Grid item xs={12} md={10}>
                            <Card className={classes.card}>
                                <Typography align="center" variant={About.resizeTitleText(this.props)}
                                            style={{marginBottom: '1%'}}>
                                    <b>About Page</b>
                                </Typography>
                                <Divider/>
                                <CardContent>
                                    <Typography align="center" variant={About.resizeSubheadingText(this.props)}>
                                        <b>"Our mission is to provide students a reliable place to store and present
                                            their capstone projects."</b>
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Grid container justify="center">
                                <Grid item xs={12} md={12}>
                                    <Card className={this.setLeftColClass(this.props)}>
                                        <CardContent>
                                            <Typography variant={About.resizeSubheadingText(this.props)}>
                                                <b>What is Cappy?</b>
                                            </Typography>
                                            <Divider/>
                                            <Typography variant={About.resizePostContentText(this.props)}
                                                        style={{marginTop: '1%'}}>
                                                Cappy is a Capstone Management System designed for students and sponsors
                                                alike. We provide students a platform to <b>store, edit, and
                                                present</b> their capstone projects.
                                                Moreover, Cappy gives our sponsors a firsthand view of the projects that
                                                they have sponsored.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12}>
                                    <Card className={classes.card}>
                                        <Grid container justify="center">
                                            <Typography align="center" variant={About.resizeTitleText(this.props)} style={{marginBottom: '1%'}}>
                                                <b>Sponsors</b>
                                            </Typography>
                                        </Grid>
                                        <Grid container justify="center">
                                            <BubbleChart
                                                graph={{
                                                    zoom: 1,
                                                    offsetX: 0,
                                                    offsetY: 0,
                                                }}
                                                showLegend={false}
                                                width={1000}
                                                height={1000}
                                                bubbleClickFun={this.bubbleClickFun}
                                                data={this.createBubbleGraphData()}
                                            >
                                            </BubbleChart>
                                        </Grid>
                                    </Card>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
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
)(About);