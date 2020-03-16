import Button from '@material-ui/core/Button';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import compose from 'recompose/compose';
import LoadingCircle from '../Components/LoadingCircle';
import {strapi} from '../constants';

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
})(props => <MuiExpansionPanelSummary {...props}/>);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
}))(MuiExpansionPanelDetails);

class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      faqs: [],
      categories: []
    };
  }

  async componentDidMount() {
    const allFaqs = await strapi.getEntries('faqs');

    const categories = allFaqs.map(faq => faq.Category);

    this.setState({loading: false, faqs: allFaqs, categories});
  }

  render() {
    const {loading, categories, faqs} = this.state;

    if (!loading) {
      return (
        <div>
          <Typography align='center'>
            <h1>FAQ</h1>
          </Typography>

          {categories.map((category) => (
            <Grid container>
              <Grid xs={12}>
                <ExpansionPanel square>
                  <ExpansionPanelSummary>
                    {category}
                  </ExpansionPanelSummary>

                  {faqs.map((question) => (
                    <div>
                      { category === question.Category &&
                        <Grid xs={12} style={{marginLeft: '4%'}}>
                          <ExpansionPanel square>
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

    return <LoadingCircle/>;
  }
}


export default compose(
  withStyles(styles),
)(FAQ);
