/*
Filename: ViewAllDepartments.js
Contributors:
Brenden Detels - Wrote entire page.
 */

import Button from '@material-ui/core/Button';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import Markdown from 'markdown-to-jsx';
import React from 'react';
import {Link} from 'react-router-dom';
import compose from 'recompose/compose';
import LoadingCircle from '../Components/LoadingCircle.js';
import {strapi} from "../constants";

const styles = theme => ({
    card: {
        raised: true,
    },
    button: {
        border: '2px solid currentColor',
        borderRadius: 0,
        height: 'auto',
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 5}px`,
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
});

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0,0,0,.125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    },
    expanded: {
        margin: 'auto',
    },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0,0,0,.03)',
        borderBottom: '1px solid rgba(0,0,0,.125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
}))(MuiExpansionPanelDetails);




class ViewAllDepartments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            departments: [],

        }
    }

    static formatDate(dateToFormat){
        var date = new Date(dateToFormat);
        return date.toDateString();
    }

    async componentDidMount() {

        const posts = await strapi.getEntries('Departments');
        this.setState({loading: false, departments: posts});

    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes } = this.props;

        if (!this.state.loading) {

            const { expanded } = this.state;


            return (
                <div className="AllSponsors" style={{marginLeft: '2.0%', marginRight: '2.0%'}}>
                    <Typography align={"center"}>
                        <h1>All Departments</h1>
                    </Typography>
                    <Grid container >
                            {this.state.departments.map((result, i) => (
                                <Grid xs={12}>

                                <ExpansionPanel
                                    square
                                    onChange={this.handleChange(('panel'.concat(i)))}

                                >

                                    <ExpansionPanelSummary>
                                        <Grid container>
                                            <Grid xs={11}>
                                                <Typography>
                                                    {result.name}
                                                </Typography>
                                            </Grid>
                                            <Grid xs={1}>
                                                <Typography>
                                                    {result['capstones'] ? result['capstones'].length + " capstones" : ''}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ExpansionPanelSummary>



                                    <ExpansionPanelDetails>
                                        <Markdown>
                                            {result.description}
                                        </Markdown>
                                    </ExpansionPanelDetails>

                                        <Grid container justify="flex-end">
                                        {result['capstones'] &&  result['capstones'].length > 0 ? result['capstones'].map((result2,i) => (
                                            <Grid xs={12} style={{marginLeft: '4%'}}>
                                            <ExpansionPanel
                                                square
                                                onChange={this.handleChange(('panel'.concat(i)))}
                                            >

                                                    <ExpansionPanelSummary >
                                                        <Typography>
                                                            {result2.CapstoneName}
                                                        </Typography>
                                                    </ExpansionPanelSummary>

                                                  <Grid container>
                                                      <Grid xs={10}>
                                                          <Grid xs={12}>
                                                            <ExpansionPanelDetails >
                                                                <Markdown>
                                                                    {result2.description}
                                                                </Markdown>
                                                            </ExpansionPanelDetails>
                                                          </Grid>
                                                          <Grid xs={4}>
                                                            <ExpansionPanelDetails>
                                                                    <Typography variant="subheading">
                                                                        Start Date: {ViewAllDepartments.formatDate(result2['StartDate'])}
                                                                    </Typography>
                                                            </ExpansionPanelDetails>
                                                          </Grid>
                                                          <Grid xs={4}>
                                                            <ExpansionPanelDetails>
                                                                <Typography variant="subheading">
                                                                    End Date: {ViewAllDepartments.formatDate(result2['EndDate'])}
                                                                </Typography>
                                                            </ExpansionPanelDetails>
                                                          </Grid>

                                                    </Grid>
                                                      <Grid xs={2}>
                                                          <ExpansionPanelDetails>
                                                              <Button className={classes.button}
                                                                      component={Link}
                                                                      to={"/ViewCapstone/" + result2._id}>
                                                                  <Typography>
                                                                      <h5>{"Visit Capstone"}</h5>
                                                                  </Typography>
                                                              </Button>
                                                          </ExpansionPanelDetails>
                                                      </Grid>
                                                  </Grid>
                                            </ExpansionPanel>
                                            </Grid>
                                        )) : ''}

                                        </Grid>

                                </ExpansionPanel>
                                </Grid>
                            ))}

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
)(ViewAllDepartments);
