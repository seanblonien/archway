
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, {Component} from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import compose from 'recompose/compose';
import LoadingCircle from '../Components/LoadingCircle';
import {schoolColorPrimary, schoolColorSecondary, strapi} from '../constants';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  title: {
    padding: '3%',
  },
  questions: {
    marginBottom: '5%',
    maxWidth: 800
  },
  subtitle: {
    padding: '1%',
  },
  section: {
    background: 'lightgrey',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '3%',
    width: '100%'

  },
  content: {
    padding: 10,
    marginLeft: '4%',
    marginBottom: '2%',
  },
  link: {
    color: schoolColorPrimary,
    "&:hover": {
      color: schoolColorSecondary,
    },
    "&:visted": {
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
      tags: [],
    };
  }

  async componentDidMount() {
    const allFaqs = await strapi.getEntries('faqs');

    const categories = allFaqs.map(faq => faq.Category);

    this.setState({loading: false, faqs: allFaqs, categories});
  }

  sortQuestions() {

  }

  render() {
    const {classes} = this.props;
    const {loading, faqs} = this.state;
    //remove duplicate categories
    const categories = Array.from(new Set(this.state.categories));

    if (!loading) {
      return (
        <div align="center">
          <Typography className={classes.title} variant="h2" align='center'>Frequently Asked Questions</Typography>

          <Grid container className={classes.questions} spacing={2} direction="row" alignItems="flex-start">
          {categories.map((category) => (
              <Grid item xs={6} >
                <Typography variant="h5" align="left">
                    {category}
                </Typography>
                {faqs.map((question, index) => (
                    <div>
                      { category === question.Category &&
                      <Grid xs={12} style={{marginLeft: '4%'}}>
                        <Link className={classes.link}  to={'/FAQ#question'+index}>
                          <Typography align="left">
                              {question.Question}
                            </Typography>
                          </Link>
                      </Grid>}
                    </div>
                ))}
              </Grid>

          ))}
          </Grid>


          <Grid container alignItems='stretch'>

          {categories.map((category) => (
              <Paper className={classes.section}>
                <Grid item xs={12}>
                  <Typography variant="h4" align="center" className={classes.subtitle}>
                    {category}
                  </Typography>
                    {faqs.map((question, index) => (
                        <div>
                          { category === question.Category &&
                          <Grid item xs={12} style={{marginLeft: '4%'}}>
                              <Typography variant="h5" id={'question'+index} align="left">
                                {question.Question}
                              </Typography>
                              <Typography className={classes.content} align="left">
                                {question.Answer}
                              </Typography>

                          </Grid>}
                        </div>
                    ))}
                </Grid>
              </Paper>
          ))}
          </Grid>

        </div>
      );
    }

    return <LoadingCircle/>;
  }
}


export default compose(
  withStyles(styles),
)(FAQ);
