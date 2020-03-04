/*
Filename: FAQ.js
Contributors:
Brenden Detels - Wrote entire page.
Ryan Cave - Took original styling Brenden created, made it dynamic & had it pull from backend instead of hardcoded. Created backend table/associations to handle FAQ.
 */

import Button from '@material-ui/core/Button';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from "react";
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



class FAQ extends React.Component {

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            faqs: [],
            categories: [],
        }
    }
    async componentDidMount() {

        const allFaqs = await strapi.getEntries('faqs');

        for (let i = 0; i < allFaqs.length; i++){
            if (!this.state.categories.includes(allFaqs[i].Category)){
                this.state.categories.push(allFaqs[i].Category);
            }
        }
        this.setState({loading: false, faqs: allFaqs});

    }

    render() {
        if (!this.state.loading) {
            return (

                <div>
                    <Typography align={"center"}>
                        <h1>FAQ</h1>
                    </Typography>

                    {this.state.categories.map((category, i) => (
                        <Grid container>
                            <Grid xs={12}>
                                <ExpansionPanel square onChange={this.handleChange(('panel1'))}>
                                    <ExpansionPanelSummary>
                                        {category}
                                    </ExpansionPanelSummary>


                                    {this.state.faqs.map((question, j) => (
                                        <div>
                                            { category === question.Category &&
                                        <Grid xs={12} style={{marginLeft: '4%'}}>
                                            <ExpansionPanel square onChange={this.handleChange(('panel1'))}>
                                                <ExpansionPanelSummary>
                                                    <Typography>
                                                        {question.Question}
                                                    </Typography>
                                                </ExpansionPanelSummary>

                                                <ExpansionPanelDetails>
                                                    {question.Answer}
                                                </ExpansionPanelDetails>
                                                {question.url &&
                                                <ExpansionPanelDetails>
                                                    <Button component={Link} to={question.url}>
                                                        More Info Here
                                                    </Button>
                                                </ExpansionPanelDetails>}
                                            </ExpansionPanel>
                                        </Grid>}
                                        </div>
                                    ))}

                                </ExpansionPanel>
                            </Grid>
                        </Grid>

                    ))}
                </div>
            );
        }

        return (
            <div>
                < LoadingCircle />
            </div>
        )
    }
}


export default compose(
    withStyles(styles),
)(FAQ);
