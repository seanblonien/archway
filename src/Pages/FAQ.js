import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import compose from 'recompose/compose';
import GridPageContainer from '../Components/LayoutWrappers/GridPageContainer';
import PageWithMargin from '../Components/LayoutWrappers/PageWithMargin';
import LoadingCircle from '../Components/LoadingCircle';
import MediaMarkdown from '../Components/Markdown/MediaMarkdown';
import api from '../Services/api';
import routes from '../utils/Routing/routes';
import root from '../utils/styles.module.css';

const styles = theme => ({
  link: {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
    '&:visited': {
      color: 'black'
    }
  }
});


class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      faqs: [],
      categories: [],
    };
  }

  async componentDidMount() {
    const allFaqs = await api.faqs.find();

    const categories = Array.from(new Set(allFaqs.map(faq => faq.category)));

    this.setState({loading: false, faqs: allFaqs, categories});
  }

  render() {
    const {classes} = this.props;
    const {loading, faqs, categories} = this.state;

    if (!loading) {
      return (
        <PageWithMargin>
          <GridPageContainer>
            <Grid item xs={12}>
              <Typography variant='h2'>Frequently Asked Questions</Typography>
            </Grid>
            <Grid item xs={12} container>
              {categories.map((category) => (
                <Grid key={`top${category.toString()}`} item xs={6}>
                  <Typography variant='h5' align='left'>
                    {category}
                  </Typography>
                  {faqs.map((question, index) => (
                    <div key={`top${index}`}>
                      {category === question.category &&
                        <Box item xs={12} style={{marginLeft: '4%'}}>
                          <Link className={classes.link} to={`${routes.faq.path}#question${index}`}>
                            <Typography align='left'>
                              {question.question}
                            </Typography>
                          </Link>
                        </Box>
                      }
                    </div>
                  ))}
                </Grid>
              ))}
            </Grid>

            <Grid item xs={12} container>
              {categories.map((category) => (
                <Paper key={category.toString()} className={root.largePaper}>
                  <Grid item xs={12}>
                    <Typography variant='h4' align='center'>
                      {category}
                    </Typography>
                    {faqs.map((question, index) => (
                      <div key={index}>
                        { category === question.category &&
                          <Box style={{marginLeft: '4%'}}>
                            <Typography variant='h5' id={`question${index}`}>
                              {question.question}
                            </Typography>
                            <Box textAlign='left'>
                              <MediaMarkdown>
                                {question.answer}
                              </MediaMarkdown>
                            </Box>
                          </Box>}
                      </div>
                    ))}
                  </Grid>
                </Paper>
              ))}
            </Grid>
          </GridPageContainer>
        </PageWithMargin>
      );
    }

    return <LoadingCircle/>;
  }
}


export default compose(
  withStyles(styles),
)(FAQ);
